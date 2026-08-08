import { requireAuth } from "@/lib/auth/require-auth";

import { getRolePermissionsService } from "@/services/settings/get-role-permissions";

import { PageContainer } from "@/components/common/layout/PageContainer";
import { PageHeader } from "@/components/common/layout/PageHeader";

import { PermissionSettingsPage } from "./PermissionSettingsPage";

type Role = "DOCTOR" | "RECEPTIONIST"

export default async function Page() {

    const user =
        await requireAuth("OWNER");

    const response =
        await getRolePermissionsService(
            user.clinicId!,
            "RECEPTIONIST"
        );


    const role: Role = "RECEPTIONIST";

    if (!response.success) {
        return (
            <PageContainer>
                <PageHeader
                    title="Permissions"
                    subtitle="Manage staff permissions."
                />

                <div>
                    Failed to load permissions.
                </div>
            </PageContainer>
        );
    }

    return (

        <PageContainer>

            <PageHeader
                title="Permissions"
                subtitle="Control what each role can access and perform in the system"
            />

            <PermissionSettingsPage
                role={role}
                permissions={response.data}
            />

        </PageContainer>

    );

}