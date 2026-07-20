import { db } from "@/db";
import { users } from "@/db/schema";
import { hashPassword } from "@/lib/auth/hash";
import { UserRepository } from "@/repositories/user.repository";

type AddClinicOwnerInput = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

export async function AddClinicOwner(data: AddClinicOwnerInput) {
    try {
        
        const user = await UserRepository.findByEmail(data.email);

        if(user) {
            throw new Error("The Owner email already exist"); 
        }

        const passwordHash = await hashPassword(data.password);

        const [owner] = await db
            .insert(users)
            .values({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: passwordHash
            })
            .returning();

        return {
            success: true,
            owner
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}