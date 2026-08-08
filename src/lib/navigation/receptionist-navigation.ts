import { Navigation } from "@/types/navigation";
import { ACTIONS, RESOURCES } from "@/constants/permissions";

export const receptionistNavigation: Navigation[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/receptionist/dashboard",
    icon: "dashboard",
    permission: {
      resource: "DASHBOARD",
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "appointments",
    title: "Appointments",
    href: "/receptionist/appointments",
    icon: "calendar",
    permission: {
      resource: RESOURCES.APPOINTMENTS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "patients",
    title: "Patients",
    href: "/receptionist/patients",
    icon: "users",
    permission: {
      resource: RESOURCES.PATIENTS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "visits",
    title: "Visits",
    href: "/receptionist/visits",
    icon: "clipboard",
    permission: {
      resource: RESOURCES.VISITS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "doctors",
    title: "Doctors",
    href: "/receptionist/doctors",
    icon: "stethoscope",
    permission: {
      resource: RESOURCES.DOCTORS,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "billing",
    title: "Billing",
    href: "/receptionist/billing",
    icon: "wallet",
    permission: {
      resource: RESOURCES.BILLING,
      action: ACTIONS.VIEW,
    },
  },
  {
    id: "invoices",
    title: "Invoices",
    href: "/receptionist/invoices",
    icon: "receipt",
    permission: {
      resource: RESOURCES.INVOICES,
      action: ACTIONS.VIEW,
    },
  },
];