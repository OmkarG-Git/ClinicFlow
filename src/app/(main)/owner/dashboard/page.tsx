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


export default async function Page() {

  const user = await requireAuth("OWNER");
  
  const dashboard = 
    await DashboardService(
      user.clinicId
    )
 
  return (
    <PageContainer className="flex flex-col gap-3">
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back! Here's what's happening in your clinic today."
      />

      <DashboardHero
        ownerName="User name"
        clinicName="Clinic name"
      />

      <DashboardStats
        stats={dashboard.data?.state}
        totalPatients={532}
        todayVisits={28}
        totalDoctors={12}
        totalReceptionists={40}
      />

      <QuickActions />

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <TodayVisits />
          <AppointmentChart />
        </div>

        <div className="space-y-6">
          <ActivityFeed />
          <RevenueChart />
        </div>
      </div>
    </PageContainer>
  );
}