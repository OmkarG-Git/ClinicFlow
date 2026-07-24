"use server"

import { requireAuth } from "@/lib/auth/require-auth";
import { errorResponse, successResponse } from "@/lib/response/service-response";
import { getDoctorByQuery } from "@/services/doctors/doctors.service";

export async function getDoctorBySearch(query: string) {
    try{

        const user = await requireAuth();

        const result = await getDoctorByQuery(
            query,
            user.clinicId
        )

        return successResponse(
            result
        )

    } catch(error) {
        return errorResponse(
            "Something went wrong"
        )
    }
}