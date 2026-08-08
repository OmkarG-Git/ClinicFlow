"use server"

import { requireAuth } from "@/lib/auth/require-auth";
import { errorResponse } from "@/lib/response/service-response";
import { 
    userValidationSchema,
    type UserValidationSchemaType
} from "@/lib/validations/owner/addUser.validation";
import { StoreUserData } from "@/services/owner/store-user-in-db";

export async function AddUserInClinic(data: UserValidationSchemaType) {
    try {

        const user = await requireAuth();

        if(!data.role) {
            console.log("not found", "or", data.role);
            return errorResponse("Something went wrong, try again later");
        }

        const response = await StoreUserData({
            ...data,
            clinicId: user.clinicId
        });

        return response;

    } catch (error) {
        return errorResponse("Something went wrong");
    }
}