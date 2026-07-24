"use server"

import { requireAuth } from "@/lib/auth/require-auth"
import { errorResponse, paginatedResponse, successResponse } from "@/lib/response/service-response";
import { appointmentSchemaType } from "@/lib/validations/appointment.validation";

import { getAppintmentsService, getAppointmentsStatsService, InsertAppointmentService } from "@/services/appointment/appintment.service";
import { AppointmentOption, PaginationOptions } from "@/types/pagination";



export async function getAppointments(filters: AppointmentOption, role: string){
    
    try {

        const user = await requireAuth(role);

        const result = await getAppintmentsService(
            user.clinicId,
            user.role,
            user.id,
            filters
        )

        return successResponse(
            result,
        )

    } catch(error) {
        if(error instanceof Error) {
            console.log("my error", error.message);
        }
        if(error instanceof Error && error.message === "NEXT_REDIRECT") {
            return errorResponse(
                "Unauthorized"
            )
        }
        return errorResponse(
            "Faild to load patients, try refresh the page"
        )
    }
}

export async function InsertAppointment(values: appointmentSchemaType) {

    try{

        const user = await requireAuth();

        const result = await InsertAppointmentService(
            values,
            user.clinicId
        )

        return successResponse(
            result,
            "Appointment added successfully"
        )

    } catch(error) {
        if(error instanceof Error) {
            return errorResponse(
                error.message || "Failed to fix appointment"
            )
        }
    }
}


export async function getAppointmentsStats(role: string) {

  try {
    const user = await requireAuth(role);

    const result = await getAppointmentsStatsService(
        user.clinicId,
        user.role,
        user.id
    )

    return successResponse(
        result
    );

  } catch (error) {
    if(error instanceof Error && error.message === "NEXT_REDIRECT") {
        throw new Error("Unauthorized");
    }
    return errorResponse(
        "Faild to load patients, try refresh the page"
    )
  }

}