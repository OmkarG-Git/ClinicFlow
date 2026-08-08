import { WorkflowSettingsModal } from "@/components/settings/modals/WorkflowSettingsModal";

export const actionRegistry = {
    "workflow-settings":
        WorkflowSettingsModal,

    // "appointment-settings":
    //     AppointmentSettingsModal,

    // "billing-settings":
    //     BillingSettingsModal,

    // "module-settings":
    //     ModuleSettingsModal,

    // "permission-settings":
    //     PermissionSettingsModal,
} as const;

export type ActionType = keyof typeof actionRegistry;