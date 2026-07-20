import {
  LayoutDashboard,
  Building2,
} from "lucide-react"

import { Navigation } from "@/types/navigation"

export const superAdminNavigation: Navigation[] = [
    {
        title: "Dashboard",
        href: "/super-admin/dashboard",
        icon: "dashboard",
    },
    {
        title: "Create Clinic",
        href: "/super-admin/create-clinic",
        icon: "building",
    },
]