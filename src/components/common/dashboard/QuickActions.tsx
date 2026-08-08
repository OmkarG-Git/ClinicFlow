"use client";

import { motion } from "framer-motion";
import {
  CalendarPlus,
  Stethoscope,
  UserPlus,
} from "lucide-react";

import { useAction } from "@/components/actions/useAction";
import { ACTIONS } from "@/constants/actions";
import { useClinicConfigurationStore } from "@/store/clinic-configuration-store";
import { SectionCard } from "@/components/common/card/SectionCard";
import { QuickAction } from "../quickActions/QuickActions";
import { QUICK_ACTIONS } from "@/constants/quick-actions";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import { can } from "@/lib/utils/FilteredAction";

export function QuickActions({ className }: { className?: string }) {

  const currentUser = useWorkspace();

  const { layout, permissionMap } =
  useClinicConfigurationStore();

  const visibleQuickActions =
    QUICK_ACTIONS.filter((item) => {
      const layoutEnabled =
        layout?.quickActions?.[item.id]?.enabled;

      const hasPermission =
        can(
          currentUser.role,
          permissionMap,
          item.resource,
          item.permission
        )

      return layoutEnabled && hasPermission;
    });
  
  const { openAction } = useAction();
  
  const quickActions: QuickAction[] = [
    {
      icon: UserPlus,
      label: "New Patient",
      handler: () => openAction(ACTIONS.CREATE_PATIENT, {
        title: "New Patient",
        description: "Create a new patient profile for your clinic.",
      })
    },

    {
      icon: CalendarPlus,
      label: "New Visit",
      handler: () => openAction(ACTIONS.CREATE_APPOINTMENT, {
        title: "New Visit",
        description: "Create a new patient profile for your clinic.",
      })
    },

    {
      icon: Stethoscope,
      label: "New Doctor",
      handler: () => openAction(ACTIONS.CREATE_DOCTOR, {
        title: "Add Doctor",
        description: "Create a new patient profile for your clinic.",
        role: "DOCTOR"
      })
    },

    {
      icon: Stethoscope,
      label: "New Receptioniest",
      handler: () => openAction(ACTIONS.CREATE_DOCTOR, {
        title: "Add Doctor",
        description: "Create a new patient profile for your clinic.",
        role: "RECEPTIONIEST"
      })
    }
  ];

  return (
    <SectionCard
      title="Quick Actions"
      description="Frequently used shortcuts"
      className={`${className} border border-border`}
    >
      <div className="grid gap-5 grid-cols-2  ">
        {visibleQuickActions.map((action, index) => {
          const Icon = action.icon;

          // const check = settings.permissions.find((s) => 

          // );

          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <button
                onClick={() => openAction(
                  action.action,
                  action.payload
                )}
                className="group flex  flex-col justify-between rounded-2xl hover:backdrop:brightness-95 transition-all duration-300 ease-in-out border border-border p-1"
              >
                <div className="flex items-center flex-col w-20 justify-center">
                  <div
                    className={` flex h-14 w-14 items-center justify-center `}
                  >
                    <Icon className="h-7 w-7" />
                  </div>

                  <h3 className="text-xs font-light text-center">
                    {action.label}
                  </h3>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </SectionCard>
  );
}