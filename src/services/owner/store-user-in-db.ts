import { 
    userValidationSchema,
    type UserValidationSchemaType
 } from "@/lib/validations/owner/addUser.validation";

import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/auth/hash";
import { errorResponse, successResponse } from "@/lib/response/service-response";
import { UserRepository } from "@/repositories/user.repository";

export async function StoreUserData(data: UserValidationSchemaType) {

    const PasswordHashing = await hashPassword(data.password); 

    try{

        const existing = await UserRepository.findByEmail(data.email);

        if(existing) {
            return errorResponse("User already exist with the same email")
        }

        const [user] = await db
            .insert(users)
            .values({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: PasswordHashing,
                role: data.role,
                clinicId: data.clinicId
            })
            .returning();

        if(user) {
            return successResponse(user, `${data.role} are created successfully`)
        }

    } catch(error:any) {
        errorResponse(
            `Something went wrong during creating ${data.role}`
        )
    }
}
