"use server";

import { requireAuth } from "@/lib/auth/require-auth";
import { getRevenueChartService } from "@/services/dashboard/dashboard.service";

export async function getRevenueChartAction(
    range: "TODAY" | "7D" | "30D" | "3M" | "1Y"
) {

    const user = await requireAuth("OWNER");

    return getRevenueChartService(
        user.clinicId,
        range
    );

}