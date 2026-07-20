"use server"

import { redirect } from "next/navigation"
import { loginSchema } from "@/lib/validations/auth"
import { AuthService } from "@/services/auth.service";

export async function loginAction (data: unknown) {
    const value = loginSchema.parse(data);

    return AuthService.login(
        value.email,
        value.password
    )
}