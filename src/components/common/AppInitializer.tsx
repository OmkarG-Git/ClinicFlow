"use client";

import { useEffect } from "react";

import { useClinicConfigurationStore } from "@/store/clinic-configuration-store";
import { ClinicConfiguration } from "@/store/clinic-configuration-store";

interface Props {
  configuration: ClinicConfiguration;
}

export function AppInitializer({
  configuration,
}: Props) {
  const setConfiguration =
    useClinicConfigurationStore(
      (state) => state.setConfiguration
    );

  useEffect(() => {
    setConfiguration(configuration);
  }, [configuration, setConfiguration]);

  return null;
}