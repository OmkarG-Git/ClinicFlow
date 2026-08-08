import { errorResponse, successResponse } from "@/lib/response/service-response";
import { getDashboard, getRevenueChart } from "@/repositories/dashboard/dashboard.repository";

export async function DashboardService(
    clinicId: string | null
) {
    try {

     if(!clinicId) {
        return errorResponse(
            "Clinic not found",
            404,
        )
     }

    const state = 
       await getDashboard(
        clinicId
    );

    return successResponse(
        state,
        "Dashboard Loaded"
    )

    } catch (error) {
        console.error("DashboardService.getDashboard:", error);
        return errorResponse(
            "Failed to load dashboard",
            500
        )
    }
}


export async function getRevenueChartService(
    clinicId: string | null,
    range: "TODAY" | "7D" | "30D" | "3M" | "1Y"
) {
    try {

        if (!clinicId) {
            return errorResponse("Clinic not found");
        }

        const revenue =
            await getRevenueChart(
                clinicId,
                range
            );

        return successResponse(
            revenue,
            "Revenue loaded"
        );

    } catch (error) {

        console.error(error);

        return errorResponse(
            "Failed to load revenue"
        );
    }
}