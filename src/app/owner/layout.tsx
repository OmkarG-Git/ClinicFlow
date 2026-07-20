import { ReactNode } from "react";
import { Navigation } from "@/types/navigation";
import { AppLayout } from "@/components/layout/AppLayout"

import { ownerNavigation } from "@/lib/navigation/owner";
import { getCurrentUser } from "@/services/auth/get-current-user";

import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";
import { email } from "zod";
export default async function SuperAdminLayout({
    children
}: { children: ReactNode }) {

    const user = await requireAuth("OWNER")

//     const user: {
//  id: string;
//  email: string;
//  isActive: boolean;
//  clinicId: string | null;
//  isOnboarded: boolean;
//  role: "SUPER_ADMIN" | "OWNER" | "DOCTOR" | "RECEPTIONIST";
//  firstName: string;
//  lastName: string;
//  avatarUrl: string | null;
//  clinic: {
//  id: string;
//  name: string;
//  clinicType: "GENERAL" | "DENTAL" | "EYE" | "ENT" | "ORTHOPEDIC" | "PEDIATRIC" | "PHYSIOTHERAPY" | "SKIN";
//  logoUrl: string | null;
//  } | null;
// }

    const sampleData = {
        firstName: "Rahul",
        lastName: "Mane",
        id: "jfhdfe45",
        role: "OWNER",
        email: "nakade@gmail.com",
        avatarUrl: null,
        isOnboarded: true,
        isActive: true,
        clinicId: "hajieuri45",
        clinic: {
            name: "Nakade",
            clinicType: "DENTAL",
            id: "hdjfh58548",
            logoUrl: null
        }
    }
    
    return (
        <WorkspaceProvider currentUser={user}>
            <AppLayout 
                navigation={ownerNavigation}
                sidebarTitle={"Owner"}
                pageTitle={"Dashboard"}
                user={user}
            >
                <main className="p-8">
                    {children}
                </main>
            </AppLayout>
        </WorkspaceProvider>
    )
}