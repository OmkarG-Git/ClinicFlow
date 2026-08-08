
import {
  UserPlus,
  CalendarPlus,
  Stethoscope,
} from "lucide-react";

import { ACTIONS } from "@/constants/actions";
import {
  RESOURCES,
  ACTIONS as PERMISSION_ACTIONS,
} from "@/constants/permissions";

export const QUICK_ACTIONS = [
  {
    id: "createPatient",
    label: "New Patient",
    icon: UserPlus,

    resource: RESOURCES.PATIENTS,
    permission: PERMISSION_ACTIONS.MANAGE,

    action: ACTIONS.CREATE_PATIENT,

    payload: {
      title: "New Patient",
      description:
        "Create a new patient profile for your clinic.",
    },
  },

  {
    id: "createVisit",
    label: "New Visit",
    icon: CalendarPlus,

    resource: RESOURCES.VISITS,
    permission: PERMISSION_ACTIONS.MANAGE,

    action: ACTIONS.CREATE_APPOINTMENT,

    payload: {
      title: "New Visit",
      description:
        "Register a new patient visit.",
    },
  },

  {
    id: "createDoctor",
    label: "New Doctor",
    icon: Stethoscope,

    resource: RESOURCES.DOCTORS,
    permission: PERMISSION_ACTIONS.MANAGE,

    action: ACTIONS.CREATE_DOCTOR,

    payload: {
      title: "Add Doctor",
      role: "DOCTOR",
    },
  },

  {
    id: "createReceptionist",
    label: "New Receptionist",
    icon: Stethoscope,

    resource: RESOURCES.RECEPTIONISTS,
    permission: PERMISSION_ACTIONS.MANAGE,

    action: ACTIONS.CREATE_DOCTOR,

    payload: {
      title: "Add Receptionist",
      role: "RECEPTIONIST",
    },
  },

  
] as const;

export type QuickActionType = typeof QUICK_ACTIONS[number];