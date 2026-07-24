import { AppointmentStatus, AppointmentType, UserRole } from "@/db/schema";
import {
  buildOffsetPaginationMeta,
  getOffsetPagination,
} from "@/lib/database/offset-pagination";
import { db } from "@/db";
import { buildSearch } from "@/lib/database/search";
import { AppointmentOption, PaginationMeta, PaginationOptions } from "@/types/pagination";
import { patients, clinicCounters, users, appointments } from "@/db/schema";
import { errorResponse } from "@/lib/response/service-response";
import { eq, count, and } from "drizzle-orm";
import { buildSort } from "@/lib/database/sort";
import { appointmentSchemaType } from "@/lib/validations/appointment.validation";
import { CodePrefix, generateCode } from "@/utils/generate-code";


export class Appointment {
  static async findMany(
    clinicId: string | null,
    role: UserRole,
    userId: string,
    options: AppointmentOption = {},
  ) {
    const { page, limit, offset } = getOffsetPagination(options);

    const searchQuery = buildSearch(options.search, [
      users.firstName,
      users.lastName,
      users.email,
      patients.firstName,
      patients.lastName,
    ]);

    const sortableColumns = {
      createdAt: appointments.createdAt,
      appointmentDate: appointments.appointmentDate,
      status: appointments.status,
    } as const;

    const sortColumn =
      sortableColumns[
        (options.sortBy as keyof typeof sortableColumns) ?? "appointmentDate"
      ];

    if (!clinicId) {
      return errorResponse("Something went wrong");
    }

    const conditions = [eq(appointments.clinicId, clinicId)];

    if (role === "DOCTOR") {
      conditions.push(eq(appointments.doctorUserId, userId));
    }

    if (options.status) {
      conditions.push(eq(appointments.status, options.status));
    }

    if (options.appointmentType) {
      conditions.push(
        eq(appointments.appointmentType, options.appointmentType),
      );
    }

    const baseWhere = and(...conditions);

    const where = searchQuery ? and(baseWhere, searchQuery) : baseWhere;

    let total: number;

    if (searchQuery) {
      const [{ total: countResult }] = await db
        .select({
          total: count(),
        })
        .from(appointments)
        .leftJoin(patients, eq(appointments.patientId, patients.id))
        .leftJoin(users, eq(appointments.doctorUserId, users.id))
        .where(where);

      total = countResult;
    } else {
      const [{ total: countResult }] = await db
        .select({
          total: count(),
        })
        .from(appointments)
        .where(baseWhere);

      total = countResult;
    }

    const data = await db
      .select({
        id: appointments.id,

        appointmentDate: appointments.appointmentDate,

        appointmentStartTime: appointments.startTime,

        appointmentEndTime: appointments.endTime,

        status: appointments.status,

        type: appointments.appointmentType,

        patientId: patients.id,

        patientFirstName: patients.firstName,

        patientLastName: patients.lastName,

        doctorId: users.id,

        doctorFirstName: users.firstName,

        doctorLastName: users.lastName,
      })
      .from(appointments)
      .leftJoin(patients, eq(appointments.patientId, patients.id))
      .leftJoin(users, eq(appointments.doctorUserId, users.id))
      .where(where)
      .orderBy(buildSort(sortColumn, options.sortOrder))
      .limit(limit)
      .offset(offset);

    const today = new Date().toISOString().split("T")[0];

    const todayWhere = and(baseWhere, eq(appointments.appointmentDate, today));

    const pagination: PaginationMeta = buildOffsetPaginationMeta(
      page,
      limit,
      total,
    );

    return {
      data,

      pagination,
    };
  }

static async getStatsData(
  clinicId: string | null,
  role: UserRole,
  userId: string
) {
  if (!clinicId) {
    return errorResponse("Clinic not found.");
  }

  const today = new Date().toISOString().split("T")[0];

  const conditions = [
    eq(appointments.clinicId, clinicId),
  ];

  if (role === "DOCTOR") {
    conditions.push(
      eq(appointments.doctorUserId, userId)
    );
  }

  const baseWhere = and(...conditions);

  const todayWhere = and(
    baseWhere,
    eq(appointments.appointmentDate, today)
  );

  const [
    [{ totalAppointments }],
    [{ todayAppointments }],
    [{ cancelled }],
    [{ completed }],
  ] = await Promise.all([
    db
      .select({
        totalAppointments: count(),
      })
      .from(appointments)
      .where(baseWhere),

    db
      .select({
        todayAppointments: count(),
      })
      .from(appointments)
      .where(todayWhere),

    db
      .select({
        cancelled: count(),
      })
      .from(appointments)
      .where(
        and(
          todayWhere,
          eq(appointments.status, "CANCELLED")
        )
      ),

    db
      .select({
        completed: count(),
      })
      .from(appointments)
      .where(
        and(
          todayWhere,
          eq(appointments.status, "COMPLETED")
        )
      ),
  ]);

  return {
    totalAppointments,
    todayAppointments,
    completed,
    cancelled,
  };
}

  static async InsertOne(
    values: appointmentSchemaType,
    clinicId: string | null,
  ) {
    try {
      if (!clinicId) {
        return {
          success: false,
          message: "Clinic ID is required",
          data: null,
        };
      }

      // Validate required fields
      if (!values.patientId) {
        return {
          success: false,
          message: "Patient is required",
          data: null,
        };
      }

      if (!values.doctorId) {
        return {
          success: false,
          message: "Doctor is required",
          data: null,
        };
      }

      if (!values.appointmentDate) {
        return {
          success: false,
          message: "Appointment date is required",
          data: null,
        };
      }

      if (!values.startTime) {
        return {
          success: false,
          message: "Start time is required",
          data: null,
        };
      }

      if (!values.appointmentType) {
        return {
          success: false,
          message: "Appointment type is required",
          data: null,
        };
      }

      // Get counter
      let counter = await db.query.clinicCounters.findFirst({
        where: eq(clinicCounters.clinicId, clinicId),
      });

      // If counter doesn't exist, create one
      if (!counter) {
        const [newCounter] = await db
          .insert(clinicCounters)
          .values({
            clinicId: clinicId,
            appointmentCounter: 1,
            patientCounter: 0,
          })
          .returning();

        counter = newCounter;
      }

      const nextAppointmentNumber = counter.appointmentCounter + 1;
      const appointmentId = generateCode({
        prefix: CodePrefix.APPOINTMENT,
        number: nextAppointmentNumber,
      });

      // Prepare data for insertion
      const appointmentData = {
        clinicId: clinicId,
        doctorUserId: values.doctorId,
        patientId: values.patientId,
        appointmentDate: values.appointmentDate,
        startTime: values.startTime,
        endTime: values.endTime, // Make sure endTime is handled
        appointmentType: values.appointmentType,
        appointmentNumber: appointmentId,
        status: values.status || "SCHEDULED", // Add default status if not provided
        notes: values.notes || null,
      };

      console.log("Inserting appointment data:", appointmentData);

      // Insert appointment
      const [result] = await db
        .insert(appointments)
        .values(appointmentData)
        .returning();

      // Update counter
      await db
        .update(clinicCounters)
        .set({
          appointmentCounter: nextAppointmentNumber,
          updatedAt: new Date(),
        })
        .where(eq(clinicCounters.clinicId, clinicId));

      return {
        success: true,
        message: "Appointment created successfully",
        data: result,
      };
    } catch (error) {
      console.error("Error creating appointment:", error);

      // Log the specific error details
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }

      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create appointment",
        data: null,
      };
    }
  }
}
