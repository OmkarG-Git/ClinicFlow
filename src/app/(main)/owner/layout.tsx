import { ReactNode } from "react";
import { Navigation } from "@/types/navigation";
import { AppLayout } from "@/components/layout/AppLayout"

import { ownerNavigation } from "@/lib/navigation/owner";
import { getCurrentUser } from "@/services/auth/get-current-user";

import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";
import { email } from "zod";
import { getClinicConfigurationAction } from "@/actions/settings/get-clinic-configuration-action";
import { ClinicConfiguration } from "@/store/clinic-configuration-store";
export default async function SuperAdminLayout({
    children
}: { children: ReactNode }) {

    const user = await requireAuth("OWNER")
    const configurationResult =
    await getClinicConfigurationAction({
        clinicId: user.clinicId,
        userId: user.id,
        role: user.role,
    });

    const safeConfiguration: ClinicConfiguration =
    configurationResult.success && configurationResult.data
        ? configurationResult.data
        : {
            settings: null,
            permissions: [],
            layout: null,
            permissionMap: {},
        };
    
    return (
        <WorkspaceProvider currentUser={user}>
            <AppLayout 
                navigation={ownerNavigation}
                sidebarTitle={"Owner"}
                pageTitle={"Dashboard"}
                user={user}
                configuration={safeConfiguration}
            >
                <main className="p-8">
                    {children}
                </main>
            </AppLayout>
        </WorkspaceProvider>
    )
}