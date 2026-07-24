import { and, eq, ilike, or, count, gte,lt } from "drizzle-orm";

import { db } from "@/db";
import { patients } from "@/db/schema";
import { PatientFormValues } from "@/lib/validations/patient.validation";
import { CodePrefix, generateCode } from "@/utils/generate-code";
import { clinicCounters } from "@/db/schema/clinic-counters";
import { PaginationOptions } from "@/types/pagination";
import { buildSearch } from "@/lib/database/search";
import {
  buildOffsetPaginationMeta,
  getOffsetPagination,
} from "@/lib/database/offset-pagination";
import { errorResponse } from "@/lib/response/service-response";
import { buildSort } from "@/lib/database/sort";
import { PatientState } from "@/components/common/owner/TableFeature/types/PatientsType";

export class Patients {
  static async findByQuery(query: string, clinicId: string | null) {
    const search = query.trim();

    if (!clinicId) {
      throw new Error("Something went wrong");
    }

    return db.query.patients.findMany({
      where: and(
        eq(patients.clinicId, clinicId),

        or(
          ilike(patients.firstName, `${search}%`),
          ilike(patients.lastName, `${search}%`),
          ilike(patients.patientCode, `${search}%`),
          ilike(patients.phone, `${search}%`),
          ilike(patients.email, `${search}%`),
        ),
      ),

      columns: {
        id: true,

        firstName: true,

        lastName: true,
      },

      limit: 10,
    });
  }

  static async InsertPatient(
    values: PatientFormValues,
    clinicId: string | null,
  ) {
    if (!clinicId) {
      throw new Error("");
    }

    let counter = await db.query.clinicCounters.findFirst({
      where: eq(clinicCounters.clinicId, clinicId),
    });

    if (!counter) {
      await db.insert(clinicCounters).values({
        clinicId: clinicId,
        patientCounter: 0,
        appointmentCounter: 0,
        invoiceCounter: 0,
        visitCounter: 0,
        prescriptionCounter: 0,
        paymentCounter: 0,
      });

      counter = await db.query.clinicCounters.findFirst({
        where: eq(clinicCounters.clinicId, clinicId),
      });
    }

    const nextPatientNumber = counter!.patientCounter + 1;

    const PatientId = generateCode({
      prefix: CodePrefix.PATIENT,
      number: nextPatientNumber,
    });

    const [patient] = await db
      .insert(patients)
      .values({
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        age: values.age,
        dateOfBirth: values.dateOfBirth,
        bloodGroup: values.bloodGroup,
        phone: values.phone,
        email: values.email,
        occupation: values.occupation,
        maritalStatus: values.maritalStatus,
        address: values.address,
        city: values.city,
        state: values.state,
        emergencyContactName: values.emergencyContactName,
        emergencyContactPhone: values.emergencyContactPhone,
        allergies: values.allergies,
        medicalNotes: values.medicalNotes,
        isActive: values.isActive,
        clinicId: clinicId,
        patientCode: PatientId,
      })
      .returning();

    return {
      patient: patient,
    };
  }

  static async findMany(
    options: PaginationOptions = {},
    clinicId: string | null,
  ) {
    if (!clinicId) {
      return errorResponse("Clinic not found.");
    }

    const { page, limit, offset } = getOffsetPagination(options);

    const searchQuery = buildSearch(options.search, [
      patients.firstName,
      patients.lastName,
      patients.phone,
      patients.email,
      patients.patientCode,
    ]);

    const sortableColumns = {
      firstName: patients.firstName,
      lastName: patients.lastName,
      patientCode: patients.patientCode,
      createdAt: patients.createdAt,
    } as const;

    const sortColumn =
      sortableColumns[
        (options.sortBy as keyof typeof sortableColumns) ?? "createdAt"
      ];

    const conditions = [eq(patients.clinicId, clinicId)];

    if (searchQuery) {
      conditions.push(searchQuery);
    }

    const where = and(...conditions);

    const [{ total }] = await db
      .select({
        total: count(),
      })
      .from(patients)
      .where(where);

    const data = await db.query.patients.findMany({
      where,

      orderBy: buildSort(sortColumn, options.sortOrder),

      limit,

      offset,

      columns: {
        id: true,

        patientCode: true,

        firstName: true,

        lastName: true,

        phone: true,

        email: true,

        gender: true,

        age: true,

        bloodGroup: true,

        updatedAt: true,
      },
    });

    const pagination = buildOffsetPaginationMeta(page, limit, total);

    return {
      data,
      pagination,
    };
  }

  static async getPatientState(
    clinicId: string | null,
  ): Promise<PatientState | ReturnType<typeof errorResponse>> {
    if (!clinicId) {
      return errorResponse("Clinic not found.");
    }

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    const firstDayOfMonth = new Date();
    firstDayOfMonth.setDate(1);

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const clinicWhere = eq(patients.clinicId, clinicId);

    const [
      [{ totalPatients }],
      [{ todaysPatients }],
      [{ newPatientsThisMonth }],
    ] = await Promise.all([
      db
        .select({
          totalPatients: count(),
        })
        .from(patients)
        .where(clinicWhere),

      db
        .select({
          todaysPatients: count(),
        })
        .from(patients)
        .where(
            and(
                clinicWhere,
                gte(patients.createdAt, todayStart),
                lt(patients.createdAt, tomorrowStart)
            )
        ),

      db
        .select({
          newPatientsThisMonth: count(),
        })
        .from(patients)
        .where(
            and(
                clinicWhere,
                gte(patients.createdAt, monthStart)
            )
        ),
    ]);

    return {
      totalPatients,
      todaysPatients,
      newPatientsThisMonth,
    };
  }
}
