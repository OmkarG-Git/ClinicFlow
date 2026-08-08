"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { SettingSwitch } from "./SettingSwitch";
import { updateWorkflowAction } from "@/actions/settings/actions";

interface WorkflowSettingsData {
  id?: string;
  workflowType?: "APPOINTMENT" | "WALK_IN" | "HYBRID";
  autoGenerateToken?: boolean;
  autoAssignDoctor?: boolean;
  requireServiceSelection?: boolean;
}

interface WorkflowSettingsModalProps {
  data?: WorkflowSettingsData;
  close?: () => void;
  onClose?: () => void;
  open?: boolean;
}

const defaultForm: WorkflowSettingsData = {
  workflowType: "APPOINTMENT",
  autoGenerateToken: false,
  autoAssignDoctor: false,
  requireServiceSelection: false,
};

export function WorkflowSettingsModal({
  data,
  close,
  onClose,
}: WorkflowSettingsModalProps) {
  const [form, setForm] = useState<WorkflowSettingsData>(() => ({
    ...defaultForm,
    ...data,
  }));

  const handleClose = () => {
    if (onClose) {
      onClose();
      return;
    }
    close?.();
  };

  async function handleSave() {
    const response = await updateWorkflowAction(form);

    if (!response.success) {
      return;
    }

    handleClose();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Workflow Settings</h2>
        <p className="text-sm text-muted-foreground">
          Configure how your clinic operates.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">Workflow Type</label>

          <div className="space-y-2">
            {["APPOINTMENT", "WALK_IN", "HYBRID"].map((type) => (
              <label
                key={type}
                className="flex cursor-pointer items-center gap-3 rounded-lg border p-3"
              >
                <input
                  type="radio"
                  checked={form.workflowType === type}
                  onChange={() =>
                    setForm({
                      ...form,
                      workflowType: type as typeof form.workflowType,
                    })
                  }
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <SettingSwitch
          title="Auto Generate Token"
          checked={form.autoGenerateToken ?? false}
          onChange={(value) =>
            setForm({
              ...form,
              autoGenerateToken: value,
            })
          }
        />

        <SettingSwitch
          title="Auto Assign Doctor"
          checked={form.autoAssignDoctor ?? false}
          onChange={(value) =>
            setForm({
              ...form,
              autoAssignDoctor: value,
            })
          }
        />

        <SettingSwitch
          title="Require Service Selection"
          checked={form.requireServiceSelection ?? false}
          onChange={(value) =>
            setForm({
              ...form,
              requireServiceSelection: value,
            })
          }
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={handleClose}>
          Cancel
        </Button>

        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
}