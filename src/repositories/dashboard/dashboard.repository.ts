
import { and, count, eq } from "drizzle-orm";

import { db } from "@/db";

import { users } from "@/db/schema";

export async function getDashboardSummary(
        clinicId: string
    ) {
        const [
            doctors,
            receptionists
        ] = await Promise.all([
            db
                .select({
                    total: count(),
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
                    total: count(),
                })
                .from(users)
                .where(
                    and(
                        eq(users.clinicId, clinicId),
                        eq(users.role, "RECEPTIONIST")
                    )
                ),
        ]);

        return {
            state: {
                totalPatients: 0,
                totalDoctors: doctors[0]?.total ?? 0,

                totalReceptionists:
                    receptionists[0]?.total ?? 0,

                todayVisits: 0,

                todayAppointments: 0,

                totalRevenue: 0
            }
        }
    }

export async function getRecentPatients() {

    }

export async function getActivities() {

}
