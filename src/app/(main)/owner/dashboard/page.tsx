

import { requireAuth } from "@/lib/auth/require-auth";
import { DashboardService } from "@/services/dashboard/dashboard.service";
import DashboardPage from "@/components/common/dashboard/DashboardPage";


export default async function Page() {

  const user = await requireAuth("OWNER");
  
  const dashboard = 
    await DashboardService(
      user.clinicId
    )
 
  return (
    <DashboardPage 
      dashboard={dashboard}
    />
  )
}