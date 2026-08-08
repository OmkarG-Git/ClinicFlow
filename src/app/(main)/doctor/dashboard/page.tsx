import { PageContainer } from "@/components/common/layout/PageContainer";
import { PageHeader } from "@/components/common/layout/PageHeader";

import { DashboardHero } from "@/components/common/dashboard/DashboardHero";
import { DashboardStats } from "@/components/common/dashboard/DashboardStats";
import { QuickActions } from "@/components/common/dashboard/QuickActions";
import { TodayVisits } from "@/components/common/dashboard/TodayVisits";
import { ActivityFeed } from "@/components/common/dashboard/ActivityFeed";
import { AppointmentChart } from "@/components/common/dashboard/AppointmentChart";
import { RevenueChart } from "@/components/common/dashboard/RevenueChart";
import { requireAuth } from "@/lib/auth/require-auth";
import { DashboardService } from "@/services/dashboard/dashboard.service";
import DashboardPage from "@/components/common/dashboard/DashboardPage";


export default async function Page() {

  const user = await requireAuth("DOCTOR");
  
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