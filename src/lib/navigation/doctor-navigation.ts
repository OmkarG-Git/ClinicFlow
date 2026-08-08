import { Navigation } from "@/types/navigation";
import { ACTIONS, RESOURCES } from "@/constants/permissions";

export const doctorNavigation: Navigation[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/doctor/dashboard",
    icon: "dashboard",
    permission: {
      resource: "DASHBOARD",
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "appointments",
    title: "Appointments",
    href: "/doctor/appointments",
    icon: "calendar",
    permission: {
      resource: RESOURCES.APPOINTMENTS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "patients",
    title: "Patients",
    href: "/doctor/patients",
    icon: "users",
    permission: {
      resource: RESOURCES.PATIENTS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "visits",
    title: "Visits",
    href: "/doctor/visits",
    icon: "clipboard",
    permission: {
      resource: RESOURCES.VISITS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "inventory",
    title: "Inventory",
    href: "/doctor/inventory",
    icon: "file-text",
    permission: {
      resource: RESOURCES.PRESCRIPTIONS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "services",
    title: "Services",
    href: "/doctor/services",
    icon: "stethoscope",
    permission: {
      resource: RESOURCES.VISITS, // change if you add SERVICES resource later
      action: ACTIONS.VIEW,
    },
  },

   {
    id: "doctors",
    title: "Doctors",
    href: "/doctor/doctors",
    icon: "stethoscope",
    permission: {
      resource: RESOURCES.VISITS, // change if you add SERVICES resource later
      action: ACTIONS.VIEW,
    },
  },
];