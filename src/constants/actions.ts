import { CalendarPlus, Stethoscope, UserPlus } from "lucide-react";
import { RESOURCES } from "./permissions";


export const ACTIONS = {
  CREATE_PATIENT: "createPatient",
  CREATE_DOCTOR: "createDoctor",
  CREATE_APPOINTMENT: "createAppointment",

  WORKFLOW_SETTINGS: "workflowSettings",
} as const;


export const QUICK_ACTIONS_CONFIG = [
  {
    key: "createPatient",
    label: "New Patient",
    icon: UserPlus,
    action: ACTIONS.CREATE_PATIENT,
    permission: {
      resource: RESOURCES.PATIENTS,
      action: "EDIT",
    },
    layoutKey: "createPatient",
  },
  {
    key: "createVisit",
    label: "New Visit",
    icon: CalendarPlus,
    action: ACTIONS.CREATE_APPOINTMENT,
    permission: {
      resource: RESOURCES.VISITS,
      action: "EDIT",
    },
    layoutKey: "createVisit",
  },
  {
    key: "createDoctor",
    label: "New Doctor",
    icon: Stethoscope,
    action: ACTIONS.CREATE_DOCTOR,
    permission: {
      resource: RESOURCES.DOCTORS,
      action: "EDIT",
    },
    layoutKey: "createDoctor",
  },
];