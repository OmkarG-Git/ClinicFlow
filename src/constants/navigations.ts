
export const navigation = {

    "dashboard": {
        href: "/owner/dashboard",
    },

    //setting permission
    "sidebarPermission": {
        href: "/owner/settings/role-layout/sidebar",
    },

    "dashboardPermission": {
        href: "/owner/settings/role-layout/dashboard",
    },

    "quickActionsPermission": {
        href: "/owner/settings/role-layout/quick-actions",
    },

    "viewProfile": {
        href: "/owner/doctor-staff/:staff",
        params: ["staff"] as const
    },

    //setting page
    "workflowSetting": {
        href: "/owner/settings/workflow",
    },

    "appointmentsSetting": {
        href:"/owner/settings/appointments"
    },

    "permissionsSettings": {
         href:"/owner/settings/permissions"
    },

    "roleLayoutSetting": {
        href:"/owner/settings/role-layout"
    },

}


export function generatePath (
    path: string,
    params: Record<string, string>
): string  {
    let result = path;
 
    for(const [key, value] of Object.entries(params)) {
        result = result.replace(`:${key}`, value);
    }

    return result;
}

export type NavigationKey = keyof typeof navigation;