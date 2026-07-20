export const DASHBOARD_WIDGETS = {
    QUICK_ACTIONS: "quick_actions",
    TODAY_APPOINTMENTS: "today_appointments",
    WAITING_QUEUE: "waiting_queue",
    RECENT_PATIENTS: "recent_patients",
    REVENUE: "revenue",
    INVENTORY: "inventory",
} as const;


export const dashboardTempSetting = {
    quick_actions: true,
    today_appointments: true,
    waiting_queue: true,
    recent_patients: true,
    revenue: false,
    inventory: false,
}