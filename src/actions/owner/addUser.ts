"use server"

import { errorResponse } from "@/lib/response/service-response";
import { 
    userValidationSchema,
    type UserValidationSchemaType
} from "@/lib/validations/owner/addUser.validation";
import { StoreUserData } from "@/services/owner/store-user-in-db";

export async function AddUserInClinic(data: UserValidationSchemaType) {
    try {
        if(!data.clinicId || !data.role) {
            return errorResponse("Something went wrong, try again later");
        }

        const response = await StoreUserData(data);

        return response;

    } catch (error) {
        return errorResponse("Something went wrong");
    }
}