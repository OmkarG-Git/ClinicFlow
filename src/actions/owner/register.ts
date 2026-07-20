"use server";

import {
    clinicSchema,
    type ClinicSchema
} from "@/lib/validations/clinic.validation"


import { ClinicType } from "@/types/ClinicType";

import { createClinic } from "@/services/owner/create-clinic";
import { getSession } from "@/lib/auth/cookies";

export async function RegisterOwnerClinic(
    data: ClinicSchema,
) {
    
    try {

         const session = await getSession();

        if (!session) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const ownerId = session?.userId;

        const response = await createClinic(data, ownerId);

        if(response.success) {
            return {
                success: true,
                message: response.message
            }
        }
    } catch(error: any) {
        return {
            message: error.message
        }
    }

}