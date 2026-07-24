"use client";

import {
  CalendarDays,
  Stethoscope,
  UserCog,
  Users,
} from "lucide-react";

import { StatsCard } from "@/components/common/card/StatsCard";
import { DashboardData } from "@/types/dashboard";

interface DashboardStatsProps {
  state: DashboardData["stats"]
}

export function DashboardStats({
  state,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Patients"
        value={state?.totalPatients}
        icon={Users}
        trend={12}
        color="blue"
      />

      <StatsCard
        title="Today's Visits"
        value={state?.todayVisits}
        icon={CalendarDays}
        trend={8}
        color="green"
      />

      <StatsCard
        title="Doctors"
        value={state?.totalDoctors}
        icon={Stethoscope}
        trend={4}
        color="purple"
      />

      <StatsCard
        title="Receptionists"
        value={state?.totalReceptionists}
        icon={UserCog}
        trend={2}
        color="orange"
      />
    </section>
  );
}