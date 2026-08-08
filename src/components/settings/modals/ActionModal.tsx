"use client";

import { useAction } from "@/components/actions/useAction";
import { actionRegistry } from "@/components/actions/action-registry";

export function ActionModal() {
  const { action, closeAction } = useAction();

  if (!action.name) {
    return null;
  }

  const Component = actionRegistry[action.name];

  if (!Component) {
    console.error(`Action "${action.name}" not found.`);
    return null;
  }

  if (action.name === "workflowSettings" || action.name === "workflow-settings") {
    return (
      <Component
        data={action.data as Record<string, unknown>}
        close={closeAction}
      />
    );
  }

  return (
    <Component
      open={true}
      onClose={closeAction}
      {...(action.data &&
      typeof action.data === "object" &&
      !Array.isArray(action.data)
        ? (action.data as Record<string, unknown>)
        : {})}
    />
  );
}