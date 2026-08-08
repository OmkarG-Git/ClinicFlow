import { AppointmentForm } from "../common/form/AppointmentForm";
import { RecepstionistAndDoctoreCreatingForm } from "../common/form/CommonUserCreatingForm";
import { PatientForm } from "../common/form/PatientsForm";
import { WorkflowSettingsModal } from "../settings/modals/WorkflowSettingsModal";
import type { ComponentType } from "react";

const registry = {
  createPatient: PatientForm,
  createDoctor: RecepstionistAndDoctoreCreatingForm,
  createAppointment: AppointmentForm,
  workflowSettings: WorkflowSettingsModal,
} as const;

export const actionRegistry: Record<string, ComponentType<any>> = registry;