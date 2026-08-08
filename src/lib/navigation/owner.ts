import { Navigation } from "@/types/navigation";
import { ACTIONS, RESOURCES } from "@/constants/permissions";

export const ownerNavigation: Navigation[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/owner/dashboard",
    icon: "dashboard",
    permission: {
      resource: "DASHBOARD",
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "appointments",
    title: "Appointments",
    href: "/owner/appointments",
    icon: "calendar",
    permission: {
      resource: RESOURCES.APPOINTMENTS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "patients",
    title: "Patients",
    href: "/owner/patients",
    icon: "users",
    permission: {
      resource: RESOURCES.PATIENTS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "doctors",
    title: "Users",
    href: "/owner/doctor-staff",
    icon: "stethoscope",
    permission: {
      resource: RESOURCES.DOCTORS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "invoices",
    title: "Invoices",
    href: "/owner/invoices",
    icon: "receipt",
    permission: {
      resource: RESOURCES.INVOICES,
      action: ACTIONS.VIEW,
    },
  },

  {
    id: "services",
    title: "Services",
    href: "/owner/services",
    icon: "stethoscope",
    permission: {
      resource: RESOURCES.VISITS, // change if you add SERVICES resource later
      action: ACTIONS.VIEW,
    },
  },

  {
    id: "visits",
    title: "Visits",
    href: "/owner/visits",
    icon: "clipboard",
    permission: {
      resource: RESOURCES.VISITS,
      action: ACTIONS.VIEW,
    },
  },

  {
    id: "settings",
    title: "Settings",
    href: "/owner/settings",
    icon: "settings",
    permission: {
      resource: "SETTINGS",
      action: ACTIONS.VIEW,
    },
  },
];


