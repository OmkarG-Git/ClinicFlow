import { getRoleOptionLayoutAction } from '@/actions/settings/get-role-layout-action';
import { RoleLayoutDashboardPage } from '@/components/settings/role-layout/dashboard/RoleLayoutDashboardPage';

export default async function page() {

    const sidebarLayout = await getRoleOptionLayoutAction("DOCTOR", "dashboard")

    if (!sidebarLayout.data) {
        throw new Error("Sidebar layout not found");
    }

  return (
    <RoleLayoutDashboardPage
        initialLayout={sidebarLayout.data.layout}
        initialSidebarLayout={sidebarLayout.data.sidebar}
        initialRole='DOCTOR'
    />
  )
}
