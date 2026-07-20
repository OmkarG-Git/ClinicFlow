import { errorResponse, successResponse } from "@/lib/response/service-response";
import { getDashboardSummary } from "@/repositories/dashboard/dashboard.repository";

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
       await getDashboardSummary(
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