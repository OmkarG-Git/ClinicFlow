import { SettingsPage } from "@/components/settings/Settingspage";
import { requireAuth } from "@/lib/auth/require-auth";

import { getClinicSettingsService }
from "@/services/owner/setting/clinic-setting.service";

export default async function Page() {

  const user =
    await requireAuth("OWNER");

  const settings =
    await getClinicSettingsService(
      user.clinicId!
    );

  return <SettingsPage settings={settings.data} />
}