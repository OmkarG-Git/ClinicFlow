import { ReactNode } from "react";
import { Navigation } from "@/types/navigation";
import { AppLayout } from "@/components/layout/AppLayout"

import { superAdminNavigation } from "@/lib/navigation/super-admin";

export default function SuperAdminLayout({
    children
}: { children: ReactNode }) {
    return (
        <AppLayout 
            navigation={superAdminNavigation}
            sidebarTitle={"Super Admin"}
            pageTitle={"Dashboard"}
        >
            <main className="p-8">
                {children}
            </main>
        </AppLayout>
    )
}