"use client"

import { PageContainer } from "@/components/common/layout/PageContainer";
import { PageHeader } from "@/components/common/layout/PageHeader";
import { DashboardHero } from './DashboardHero';
import { DashboardStats } from './DashboardStats';
import { RevenueChart } from './RevenueChart';
import { ActivityFeed } from './ActivityFeed';
import { QuickActions } from './QuickActions';
import { TodayVisits } from './TodayVisits';
import { AppointmentChart } from './AppointmentChart';
import { useClinicConfigurationStore } from "@/store/clinic-configuration-store";



export default function DashboardPage(dashboard:any) {

    const setting = useClinicConfigurationStore();


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
            state={dashboard.data?.state}
          />
    
         <div className="flex gap-3">
            <RevenueChart
             summary={dashboard.data?.revenueChart.summary}
             chart={dashboard.data?.revenueChart.chart}
             className="w-full" 
            />
            <ActivityFeed className="w-full" />
            <QuickActions className="max-w-65 w-full " />
          </div>
    
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="space-y-6 xl:col-span-2">
              <TodayVisits data={dashboard.data?.todayVisits} />
              <AppointmentChart data={dashboard.data?.appointmentChart} />
            </div>
    
            <div className="space-y-6">
    
            </div>
          </div>
          
        </PageContainer>
  )
}
