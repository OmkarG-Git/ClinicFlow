import { getRoleOptionLayoutAction } from '@/actions/settings/get-role-layout-action';
import { RoleLayoutQuickActionPage } from '@/components/settings/role-layout/quickAction/RoleLayoutQuickActionPage';

export default async function page() {

    const sidebarLayout = await getRoleOptionLayoutAction("DOCTOR", "quickActions")

    if (!sidebarLayout.data) {
        throw new Error("Sidebar layout not found");
    }

  return (
    <RoleLayoutQuickActionPage
        initialLayout={sidebarLayout.data.layout}
        initialRole='DOCTOR'
        initialSidebarLayout={sidebarLayout.data.sidebar}
    />
  )
}
