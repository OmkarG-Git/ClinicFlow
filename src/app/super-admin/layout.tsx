import { ReactNode } from "react";
import { Navigation } from "@/types/navigation";
import { AppLayout } from "@/components/layout/AppLayout"

import { superAdminNavigation } from "@/lib/navigation/super-admin";
import { requireAuth } from "@/lib/auth/require-auth";
import { WorkspaceProvider } from "@/providers/WorkspaceProvider";

export default async function SuperAdminLayout({
    children
}: { children: ReactNode }) {

     const user = await requireAuth("SUPER_ADMIN")

    return (
          <WorkspaceProvider currentUser={user}>
            <AppLayout 
                navigation={superAdminNavigation}
                sidebarTitle={"Super Admin"}
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