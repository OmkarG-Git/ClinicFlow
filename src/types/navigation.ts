import { LucideIcon } from "lucide-react";

export interface Navigation {
    id?: string,
    title: string;
    href: string;
    icon: "dashboard" | "building" | "calendar" | "users" | "stethoscope" | "receipt" | "settings";
    permission?: {
    resource: string;
    action: string;
  };
}