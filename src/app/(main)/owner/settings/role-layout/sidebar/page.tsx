import { getRoleOptionLayoutAction } from '@/actions/settings/get-role-layout-action'
import { RoleLayoutSidebarPage } from '@/components/settings/role-layout/sidebar/RoleLayoutSidebarPage'

export default async function page() {

    const sidebarLayout = await getRoleOptionLayoutAction("DOCTOR", "sidebar")

    if (!sidebarLayout.data) {
      throw new Error("Sidebar layout not found");
    }

  return (
    <RoleLayoutSidebarPage 
        initialRole='DOCTOR' 
        initialLayout={sidebarLayout.data.layout}
        initialSidebarLayout={sidebarLayout.data.sidebar} 
    />
  )
}