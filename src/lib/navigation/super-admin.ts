import {
  LayoutDashboard,
  Building2,
} from "lucide-react"

import { Navigation } from "@/types/navigation"

export const superAdminNavigation: Navigation[] = [
    {
        id: "dashboard",
        title: "Dashboard",
        href: "/super-admin/dashboard",
        icon: "dashboard",
    },
    {
        id: "createClinic",
        title: "Create Clinic",
        href: "/super-admin/create-clinic",
        icon: "building",
    },
]