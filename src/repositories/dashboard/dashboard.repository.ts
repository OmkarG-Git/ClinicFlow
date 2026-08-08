
import { and, count, eq, asc, sum, sql, desc, gte, lte } from "drizzle-orm";

import { db } from "@/db";

import { invoices, payments, users } from "@/db/schema";
import { patients } from "@/db/schema";


import { appointments } from "@/db/schema/appointments";
import { ActivityItem } from "@/types/dashboard";

async function getTodayVisits(clinicId: string) {
  const today = new Date().toLocaleDateString("en-CA");
  console.log("Fetching today's visits for clinicId:", clinicId, "on date:", today);

  return await db
    .select({
      id: appointments.id,

      appointmentNumber: appointments.appointmentNumber,

      appointmentStartTime: appointments.startTime,

      appointmentType: appointments.appointmentType,

      status: appointments.status,

      patientId: patients.id,

      patientFirstName: patients.firstName,

      patientLastName: patients.lastName,

      doctorId: users.id,

      doctorFirstName: users.firstName,

      doctorLastName: users.lastName,
    })
    .from(appointments)
    .leftJoin(
      patients,
      eq(appointments.patientId, patients.id)
    )
    .leftJoin(
      users,
      eq(appointments.doctorUserId, users.id)
    )
    .where(
      and(
        eq(appointments.clinicId, clinicId),
        eq(appointments.appointmentDate, today)
      )
    )
    .orderBy(
      asc(appointments.startTime)
    )
    .limit(5);
}


export async function getSummary(
  clinicId: string
) {
  const today = new Date()
    .toISOString()
    .split("T")[0];

  const [
    [{ totalDoctors }],
    [{ totalReceptionists }],
    [{ totalPatients }],
    [{ todayAppointments }],
    [{ todayVisits }],
    [{ totalRevenue }],
  ] = await Promise.all([
    db
      .select({
        totalDoctors: count(),
      })
      .from(users)
      .where(
        and(
          eq(users.clinicId, clinicId),
          eq(users.role, "DOCTOR")
        )
      ),

    db
      .select({
        totalReceptionists: count(),
      })
      .from(users)
      .where(
        and(
          eq(users.clinicId, clinicId),
          eq(users.role, "RECEPTIONIST")
        )
      ),

    db
      .select({
        totalPatients: count(),
      })
      .from(patients)
      .where(
        eq(patients.clinicId, clinicId)
      ),

    db
      .select({
        todayAppointments: count(),
      })
      .from(appointments)
      .where(
        and(
          eq(appointments.clinicId, clinicId),
          eq(appointments.appointmentDate, today)
        )
      ),

    db
      .select({
        todayVisits: count(),
      })
      .from(appointments)
      .where(
        and(
          eq(appointments.clinicId, clinicId),
          eq(appointments.appointmentDate, today),
          sql`${appointments.status} != 'SCHEDULED'`
        )
      ),

    db
      .select({
        totalRevenue:
          sum(invoices.total),
      })
      .from(invoices)
      .where(
        eq(invoices.clinicId, clinicId)
      ),
  ]);

  return {
    totalDoctors,
    totalReceptionists,
    totalPatients,
    todayAppointments,
    todayVisits,
    totalRevenue:
      Number(totalRevenue ?? 0),
  };
}

export async function getAppointmentChart(
  clinicId: string
) {
  const startDate = new Date();

  startDate.setDate(startDate.getDate() - 6);

  const result = await db
    .select({
      date: appointments.appointmentDate,

      appointments: count(),
    })
    .from(appointments)
    .where(
      and(
        eq(appointments.clinicId, clinicId),
        gte(
          appointments.appointmentDate,
          startDate.toISOString().split("T")[0]
        )
      )
    )
    .groupBy(
      appointments.appointmentDate
    )
    .orderBy(
      appointments.appointmentDate
    );

  return result.map((item) => ({
    date: new Date(item.date),

    appointments: item.appointments,
  }));
}


export async function getRevenueChart(
  clinicId: string | null,
  range: "TODAY" | "7D" | "30D" | "3M" | "1Y"
) {

  if(!clinicId) {
    throw new Error("Clinic not found");
  }

  const now = new Date();

  const endDate = new Date(now);

  const startDate = new Date(now);

  switch (range) {
    case "TODAY":
      startDate.setHours(0, 0, 0, 0);
      break;

    case "7D":
      startDate.setDate(now.getDate() - 6);
      break;

    case "30D":
      startDate.setDate(now.getDate() - 29);
      break;

    case "3M":
      startDate.setMonth(now.getMonth() - 2);
      break;

    case "1Y":
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }

  const rows = await db
    .select({
        createdAt: invoices.createdAt,
        total: invoices.total,
    })
    .from(invoices)
    .where(
        and(
            eq(invoices.clinicId, clinicId),
            eq(invoices.status, "PAID"),
            gte(invoices.createdAt, startDate),
            lte(invoices.createdAt, endDate)
        )
    );

  const chartMap = new Map<
      string,
      {
          revenue: number;
          invoices: number;
      }
  >();

  for (const row of rows) {

    const date = new Date(row.createdAt);

    let label = "";

    if (range === "TODAY") {

        label = date.toLocaleTimeString("en-IN", {
            hour: "numeric",
        });

    } else {

        label = date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
        });

    }

    const current =
        chartMap.get(label) ??
        {
            revenue: 0,
            invoices: 0,
        };

    current.revenue += Number(row.total);

    current.invoices++;

    chartMap.set(label, current);

  }

  const chart = Array.from(chartMap.entries()).map(
    ([label, value]) => ({
        label,
        revenue: value.revenue,
        invoices: value.invoices,
    })
  );

  const totalRevenue =
    chart.reduce(
        (sum, item) => sum + item.revenue,
        0
    );

  const totalInvoices =
    chart.reduce(
          (sum, item) => sum + item.invoices,
          0
    );

  return {

      summary: {
          totalRevenue,
          totalInvoices,
      },

      chart,
  };
}

export async function getRecentActivities(
  clinicId: string
): Promise<ActivityItem[]> {
  const [recentPatients, recentAppointments, recentPayments] =
    await Promise.all([
      db
        .select({
          id: patients.id,
          firstName: patients.firstName,
          lastName: patients.lastName,
          createdAt: patients.createdAt,
        })
        .from(patients)
        .where(eq(patients.clinicId, clinicId))
        .orderBy(desc(patients.createdAt))
        .limit(5),

      db
        .select({
          id: appointments.id,
          appointmentNumber: appointments.appointmentNumber,
          createdAt: appointments.createdAt,
        })
        .from(appointments)
        .where(eq(appointments.clinicId, clinicId))
        .orderBy(desc(appointments.createdAt))
        .limit(5),

      db
        .select({
          id: payments.id,
          amount: payments.amount,
          createdAt: payments.createdAt,
        })
        .from(payments)
        .innerJoin(
          invoices,
          eq(payments.invoiceId, invoices.id)
        )
        .where(eq(invoices.clinicId, clinicId))
        .orderBy(desc(payments.createdAt))
        .limit(5),
    ]);

  const activities: ActivityItem[] = [
    ...recentPatients.map((patient) => ({
      id: patient.id,
      type: "PATIENT_REGISTERED" as const,
      title: "New patient registered",
      description: `${patient.firstName} ${patient.lastName} was added to the clinic`,
      createdAt: patient.createdAt,
    })),

    ...recentAppointments.map((appointment) => ({
      id: appointment.id,
      type: "APPOINTMENT_CREATED" as const,
      title: "Appointment booked",
      description: `Appointment #${appointment.appointmentNumber} was scheduled`,
      createdAt: appointment.createdAt,
    })),

    ...recentPayments.map((payment) => ({
      id: payment.id,
      type: "PAYMENT_RECEIVED" as const,
      title: "Payment received",
      description: `$${Number(payment.amount).toFixed(2)} payment recorded`,
      createdAt: payment.createdAt,
    })),
  ];

  return activities
    .sort(
      (a, b) =>
        b.createdAt.getTime() - a.createdAt.getTime()
    )
    .slice(0, 10);
}


export async function getDashboard(
  clinicId: string
) {

  const range = "TODAY"

  const [
    state,
    todayVisits,
    appointmentChart,
    revenueChart,
    activities,
  ] = await Promise.all([
    getSummary(clinicId),
    getTodayVisits(clinicId),
    getAppointmentChart(clinicId),
    getRevenueChart(clinicId, range),
    getRecentActivities(clinicId),
  ]);

  return {
    state,
    todayVisits,
    appointmentChart,
    revenueChart,
    activities,
  };
}
