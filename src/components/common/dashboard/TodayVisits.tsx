"use client";

import { Clock3, User } from "lucide-react";

import { SectionCard } from "@/components/common/card/SectionCard";
import { StatusBadge } from "@/components/common/feedback/StatusBadge";

const visits = [
  {
    id: 1,
    patient: "Rahul Sharma",
    doctor: "Dr. Mehta",
    time: "09:00 AM",
    type: "Walk-in",
    status: "Waiting",
  },
  {
    id: 2,
    patient: "Priya Patel",
    doctor: "Dr. Shah",
    time: "09:30 AM",
    type: "Appointment",
    status: "Consulting",
  },
  {
    id: 3,
    patient: "Ajay Kumar",
    doctor: "Dr. Shah",
    time: "10:00 AM",
    type: "Walk-in",
    status: "Completed",
  },
];

export function TodayVisits() {
  return (
    <SectionCard
      title="Today's Visits"
      description="Live patient queue"
    >
      <div className="space-y-4">
        {visits.map((visit) => (
          <div
            key={visit.id}
            className="group flex items-center justify-between rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-5 w-5 text-primary" />
              </div>

              <div>
                <h3 className="font-semibold">
                  {visit.patient}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {visit.doctor}
                </p>
              </div>
            </div>

            <div className="hidden lg:block">
              <p className="text-sm font-medium">
                {visit.type}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm">
                {visit.time}
              </span>
            </div>

            <StatusBadge status={visit.status} />
          </div>
        ))}
      </div>
    </SectionCard>
  );
}