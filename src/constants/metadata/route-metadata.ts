import { Navigation } from "@/types/navigation";
import { LayoutDashboard, Calendar, Users, Settings } from "lucide-react";

export const ROUTE_METADATA = {
  "/owner/dashboard": {
    title: "Dashboard",
    icon: LayoutDashboard,
  },

  "/owner/settings": {
    title: "Settings",
    icon: Settings,
  },

  "/owner/settings/role-layout": {
    title: "Role Layout",
  },

  "/owner/settings/role-layout/sidebar": {
    title: "Sidebar Layout",
  },

  "/owner/settings/role-layout/dashboard": {
    title: "Dashboard Layout",
  },

  "/owner/settings/role-layout/quick-actions": {
    title: "Quick Actions",
  },

  "/owner/patients": {
    title: "Patients",
    icon: Users,
  },

  "/owner/appointments": {
    title: "Appointments",
    icon: Calendar,
  },

  "/owner/settings/permissions": {
    title: "Permissions"
  },
  
} as const;