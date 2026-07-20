import { Navigation } from "@/types/navigation";
import { ACTIONS, RESOURCES } from "@/constants/permissions";

export const ownerNavigation: Navigation[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/owner/dashboard",
    icon: "dashboard",
    permission: {
      resource: RESOURCES.DASHBOARD,
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
    title: "Doctors",
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
    id: "clinic",
    title: "Clinic",
    href: "/owner/clinic",
    icon: "building",
    permission: {
      resource: RESOURCES.CLINIC,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "settings",
    title: "Settings",
    href: "/owner/settings",
    icon: "settings",
    permission: {
      resource: RESOURCES.SETTINGS,
      action: ACTIONS.VIEW,
    },
  },
];