export const LAYOUT_DEPENDENCIES = {
  patients: {
    quickActions: ["createPatient"],
    dashboard: ["patientGrowth"],
  },

  visits: {
    quickActions: ["createVisit"],
    dashboard: [
      "todayVisits",
      "weeklyVisitsChart",
    ],
  },

  appointments: {
    quickActions: ["createAppointment"],
    dashboard: [
      "upcomingAppointments",
      "calendar",
    ],
  },

  billing: {
    quickActions: ["createBill"],
    dashboard: [
      "pendingBills",
      "revenueChart",
    ],
  },

  inventory: {
    quickActions: [],
    dashboard: [
      "inventoryAlerts",
    ],
  },

  doctors: {
    quickActions: ["createDoctor"],
    dashboard: [
      "doctorPerformance",
    ],
  },

  services: {
    quickActions: ["addService"],
    dashboard: [
      "topServices",
    ],
  },
} as const;