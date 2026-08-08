
export interface Navigation {
    id: string,
    title: string;
    href: string;
    icon: "dashboard" | "building" | "calendar" | "users" | "stethoscope" | "receipt" | "settings" | "file-text" | "clipboard" | "wallet";
    permission?: {
    resource: string;
    action: string;
  };
}