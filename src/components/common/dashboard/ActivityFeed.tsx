"use client";

import {
  CalendarPlus,
  CreditCard,
  Stethoscope,
  UserPlus,
} from "lucide-react";

import { SectionCard } from "@/components/common/card/SectionCard";

const activities = [
  {
    id: 1,
    title: "Rahul Sharma registered",
    description: "Receptionist added a new patient",
    time: "2 min ago",
    icon: UserPlus,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: 2,
    title: "Consultation completed",
    description: "Dr. Mehta finished today's visit",
    time: "8 min ago",
    icon: Stethoscope,
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    id: 3,
    title: "Appointment booked",
    description: "Tomorrow at 11:00 AM",
    time: "18 min ago",
    icon: CalendarPlus,
    color: "bg-violet-500/10 text-violet-600",
  },
  {
    id: 4,
    title: "Invoice Paid",
    description: "₹850 received",
    time: "25 min ago",
    icon: CreditCard,
    color: "bg-orange-500/10 text-orange-600",
  },
];

export function ActivityFeed({ className }: { className?: string }) {
  return (
    <SectionCard
      title="Recent Activity"
      description="Latest clinic updates"
      className={`${className} border-border`}
    >
      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className="relative flex gap-4"
            >
              {index !== activities.length - 1 && (
                <div className="absolute left-6 top-12 h-full w-px bg-border" />
              )}

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${activity.color}`}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between gap-4">
                  <h4 className="font-semibold">
                    {activity.title}
                  </h4>

                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}