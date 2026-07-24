"use server"

import { redirect } from "next/navigation";
import { getCurrentUser } from "@/services/auth/get-current-user";

type UserRole = string;

export async function requireAuth(role?: UserRole) {

    const response = await getCurrentUser();

    if (!response.success || !response.data) {
        redirect("/login");
    }

    if (role && response.data.role !== role) {
        redirect("/unauthorized");
    }

    return response.data;
}