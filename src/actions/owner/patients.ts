"use server"

import { requireAuth } from "@/lib/auth/require-auth";
import { errorResponse, successResponse } from "@/lib/response/service-response";
import { PatientFormValues } from "@/lib/validations/patient.validation";
import { addPatientService, getPatientsService, getPatientsSearchService, getPatientState } from "@/services/patients/patients.service";
import { PaginationMeta, PaginationOptions } from "@/types/pagination";

export async function getPatients(query: string) {
    try{

        const user = await requireAuth();

        const result = await getPatientsSearchService(
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


export async function addPatient(values: PatientFormValues) {

    const user = await requireAuth();

    try{
        const result = await addPatientService(
            values,
            user.clinicId
        )

        return successResponse(
            result,
            "Patient created successfully!",
        )
    } catch(error: any) {
        console.log("my db error", error.message)
        return errorResponse("Failed to create patient")
    }

}

export async function getPatientsAction(filters: PaginationOptions, role: string) {

    const user = await requireAuth(role);

    const result = await getPatientsService(
        filters,
        user.clinicId
    );

    return successResponse(
        result
    );

} 

export async function getPatientsStateAction(role: string) {
    
    const user = await requireAuth(role);

    const result = await getPatientState(
        user.clinicId
    );

    return successResponse(
        result
    );
}