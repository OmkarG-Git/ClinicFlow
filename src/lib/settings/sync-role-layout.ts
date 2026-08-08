import { LAYOUT_DEPENDENCIES } from "@/constants/layout-dependency";
import { RoleLayout } from "@/db/schema";

export function syncRoleLayout(layout: RoleLayout) {
    const updated = structuredClone(layout);

    for(const [sidebarKey, dependency] of Object.entries(LAYOUT_DEPENDENCIES)) {
        const sidebarEnable = 
            updated.sidebar[sidebarKey as keyof RoleLayout['sidebar']].enabled;

        if(sidebarEnable) continue;

        if(dependency.quickActions) {
            for(const action of dependency.quickActions) {
                updated.quickActions[action].enabled = false
            }
        }

        if(dependency.dashboard) {
            for(const action of dependency.dashboard) {
                updated.dashboard[action].enabled = false;
            }
        }
    }

    return updated;
}