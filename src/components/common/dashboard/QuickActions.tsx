"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarPlus,
  Stethoscope,
  UserPlus,
  UserCog,
  FilePlus2,
  ArrowRight,
} from "lucide-react";

import { SectionCard } from "@/components/common/card/SectionCard";

const ACTIONS = [
  {
    title: "New Visit",
    description: "Walk-in or check-in patient",
    icon: UserPlus,
    href: "/owner/visits/new",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Appointment",
    description: "Book an appointment",
    icon: CalendarPlus,
    href: "/owner/appointments/new",
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Add Doctor",
    description: "Create doctor account",
    icon: Stethoscope,
    href: "/owner/doctors/new",
    color: "from-emerald-500 to-green-500",
  },
  {
    title: "Receptionist",
    description: "Add receptionist",
    icon: UserCog,
    href: "/owner/receptionists/new",
    color: "from-orange-500 to-amber-500",
  },
  {
    title: "Register Patient",
    description: "Create patient profile",
    icon: FilePlus2,
    href: "/owner/patients/new",
    color: "from-rose-500 to-pink-500",
  },
];

export function QuickActions() {
  return (
    <SectionCard
      title="Quick Actions"
      description="Frequently used shortcuts"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {ACTIONS.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link
                href={action.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <div>
                  <div
                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-lg font-semibold">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                  Open
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </SectionCard>
  );
}