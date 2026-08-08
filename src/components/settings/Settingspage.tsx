import { PageContainer } from "../common/layout/PageContainer";
import { PageHeader } from "../common/layout/PageHeader";
import { SettingsCard } from "./SettingsCard";
import Link from "next/link";
import { 
  Settings, 
  Calendar, 
  DollarSign, 
  Package, 
  Shield,
  Sparkles 
} from "lucide-react";
import Navigator from "@/components/common/navigation/Navigator";

type SettingsData = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  clinicId: string;
  workflowType: "WALK_IN" | "APPOINTMENT" | "HYBRID";
  billingEnabled: boolean;
  inventoryEnabled: boolean;
  autoGenerateToken: boolean;
  autoAssignDoctor: boolean;
  requireServiceSelection: boolean;
  appointmentDuration: number;
  appointmentBuffer: number;
  currency: string;
  invoicePrefix: string | null;
  tokenPrefix: string | null;
};

type SettingsPageProps = {
  settings?: SettingsData | null;
};

export function SettingsPage({ settings }: SettingsPageProps) {



  return (
    <PageContainer>
      <PageHeader 
        title="Settings" 
        subtitle="Manage clinic configuration and preferences."
      />

      <div className="grid gap-3 mt-6">
        <Navigator 
          id="workflowSetting"
        >
          <SettingsCard
            title="Workflow"
            description="Appointment, walk-in and clinic workflow"
            icon={<Settings className="h-5 w-5" />}
          />
        </Navigator>

        <Navigator
          id="appointmentsSetting"
        >
          <SettingsCard
            title="Appointments"
            description="Duration, buffer and scheduling"
            icon={<Calendar className="h-5 w-5" />}
          />
        </Navigator>

        <SettingsCard
          title="Billing"
          description="Currency, invoice numbering"
          icon={<DollarSign className="h-5 w-5" />}
        />

        <SettingsCard
          title="Modules"
          description="Enable or disable clinic modules"
          icon={<Package className="h-5 w-5" />}
        />

        <Navigator
            id="permissionsSettings"
        >
            <SettingsCard
            title="Permissions"
            description="Manage staff permissions and roles"
            icon={<Shield className="h-5 w-5" />}
            />
        </Navigator>

        <Navigator
            id="roleLayoutSetting"
        >
            <SettingsCard
              title="Role Layout"
              description="Manage staff layour"
              icon={<Shield className="h-5 w-5" />}
            />
        </Navigator>

        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-emerald-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-400">Advanced Settings</p>
              <p className="text-sm text-white/40">
                Additional configuration options are available in the advanced settings panel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}