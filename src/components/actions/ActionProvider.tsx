"use client";

import {
  createContext,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

import { actionRegistry } from "./action-registry";

type ActionState = {
  name: string | null;
  data?: unknown;
};

type ActionContextType = {
  action: ActionState;
  openAction: (action: string, data?: unknown) => void;
  closeAction: () => void;
};

export const ActionContext = createContext<ActionContextType | null>(null);

export function ActionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [action, setAction] = useState<ActionState>({ name: null });

  const openAction = (actionName: string, data?: unknown) => {
    setAction({ name: actionName, data });
  };

  const closeAction = () => {
    setAction({ name: null });
  };

  const Component =
    action.name && actionRegistry[action.name]
      ? (actionRegistry[action.name] as ComponentType<any>)
      : null;

  const componentProps =
    action.name === "workflowSettings" || action.name === "workflow-settings"
      ? {
          data: action.data,
          close: closeAction,
        }
      : {
          open: true,
          onClose: closeAction,
          ...(action.data &&
          typeof action.data === "object" &&
          !Array.isArray(action.data)
            ? (action.data as Record<string, unknown>)
            : {}),
        };

  return (
    <ActionContext.Provider value={{ action, openAction, closeAction }}>
      {children}

      {Component ? <Component {...componentProps} /> : null}
    </ActionContext.Provider>
  );
}