"use client";

import {
  useContext,
} from "react";

import {
  ActionContext,
} from "./ActionProvider";

export function useAction() {
  const context =
    useContext(ActionContext);

  if (!context) {
    throw new Error(
      "useAction must be used inside ActionProvider"
    );
  }

  return context;
}