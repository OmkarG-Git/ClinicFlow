export const RESOURCES = {
  PATIENTS: "PATIENTS",
  VISITS: "VISITS",
  APPOINTMENTS: "APPOINTMENTS",
  DOCTORS: "DOCTORS",
  RECEPTIONISTS: "RECEPTIONISTS",
  PRESCRIPTIONS: "PRESCRIPTIONS",
  BILLING: "BILLING",
  INVOICES: "INVOICES",
  INVENTORY: "INVENTORY",
  REPORTS: "REPORTS",
} as const;

export const ACTIONS = {
  VIEW: "VIEW",
  MANAGE: "MANAGE",
  DELETE: "DELETE",
} as const;

export const DEFAULT_PERMISSIONS = {
  OWNER: {
    all: true,
    permissions: {},
  },

  DOCTOR: {
    all: false,
    permissions: {
      PATIENTS: ["VIEW", "MANAGE"],
      VISITS: ["VIEW", "MANAGE"],
      APPOINTMENTS: ["VIEW", "MANAGE"],
      PRESCRIPTIONS: ["VIEW", "MANAGE", "DELETE"],
      BILLING: ["VIEW"],
      REPORTS: ["VIEW"],
    },
  },

  RECEPTIONIST: {
    all: false,
    permissions: {
      PATIENTS: ["VIEW", "MANAGE"],
      VISITS: ["VIEW", "MANAGE"],
      APPOINTMENTS: ["VIEW", "MANAGE"],
      DOCTORS: ["VIEW"],
      RECEPTIONISTS: ["VIEW"],
      BILLING: ["VIEW", "MANAGE"],
      INVOICES: ["VIEW", "MANAGE"],
    },
  },
} as const;

export const DEFAULT_LAYOUTS = {
  OWNER: {
    sidebar: {
      dashboard: { enabled: true },
      patients: { enabled: true },
      visits: { enabled: true },
      appointments: { enabled: true },
      doctors: { enabled: true },
      receptionists: { enabled: true },
      services: { enabled: true },
      billing: { enabled: true },
      inventory: { enabled: true },
      reports: { enabled: true },
      settings: { enabled: true },
    },

    dashboard: {
      revenueChart: {
        enabled: true,
        defaultRange: "30D",
      },

      weeklyVisitsChart: {
        enabled: true,
        defaultRange: "7D",
      },

      todayVisits: {
        enabled: true,
      },

      upcomingAppointments: {
        enabled: true,
      },

      pendingBills: {
        enabled: true,
      },

      inventoryAlerts: {
        enabled: true,
      },

      doctorPerformance: {
        enabled: true,
      },

      patientGrowth: {
        enabled: true,
      },

      topServices: {
        enabled: true,
      },

      calendar: {
        enabled: true,
      },

      recentActivity: {
        enabled: true,
        limit: 20,
        showPatients: true,
        showAppointments: true,
        showBilling: true,
        showInventory: true,
      },

      quickActions: {
        enabled: true,
      },
    },

    quickActions: {
      createPatient: { enabled: true },
      createVisit: { enabled: true },
      createAppointment: { enabled: true },
      createBill: { enabled: true },
      createDoctor: { enabled: true },
      addService: { enabled: true },
    },
  },

  DOCTOR: {
    sidebar: {
      dashboard: { enabled: true },
      patients: { enabled: true },
      visits: { enabled: true },
      appointments: { enabled: true },
      doctors: { enabled: false },
      receptionists: { enabled: false },
      services: { enabled: true },
      billing: { enabled: false },
      inventory: { enabled: false },
      reports: { enabled: false },
      settings: { enabled: false },
    },

    dashboard: {
      revenueChart: {
        enabled: false,
        defaultRange: "30D",
      },

      weeklyVisitsChart: {
        enabled: false,
        defaultRange: "7D",
      },

      todayVisits: {
        enabled: true,
      },

      upcomingAppointments: {
        enabled: true,
      },

      pendingBills: {
        enabled: false,
      },

      inventoryAlerts: {
        enabled: false,
      },

      doctorPerformance: {
        enabled: true,
      },

      patientGrowth: {
        enabled: false,
      },

      topServices: {
        enabled: false,
      },

      calendar: {
        enabled: true,
      },

      recentActivity: {
        enabled: true,
        limit: 15,
        showPatients: true,
        showAppointments: true,
        showBilling: false,
        showInventory: false,
      },

      quickActions: {
        enabled: true,
      },
    },

    quickActions: {
      createPatient: { enabled: false },
      createVisit: { enabled: true },
      createAppointment: { enabled: false },
      createBill: { enabled: false },
      createDoctor: { enabled: false },
      addService: { enabled: false },
    },
  },

  RECEPTIONIST: {
    sidebar: {
      dashboard: { enabled: true },
      patients: { enabled: true },
      visits: { enabled: true },
      appointments: { enabled: true },
      doctors: { enabled: true },
      receptionists: { enabled: false },
      services: { enabled: true },
      billing: { enabled: true },
      inventory: { enabled: false },
      reports: { enabled: false },
      settings: { enabled: false },
    },

    dashboard: {
      revenueChart: {
        enabled: false,
        defaultRange: "30D",
      },

      weeklyVisitsChart: {
        enabled: true,
        defaultRange: "7D",
      },

      todayVisits: {
        enabled: true,
      },

      upcomingAppointments: {
        enabled: true,
      },

      pendingBills: {
        enabled: true,
      },

      inventoryAlerts: {
        enabled: false,
      },

      doctorPerformance: {
        enabled: false,
      },

      patientGrowth: {
        enabled: false,
      },

      topServices: {
        enabled: false,
      },

      calendar: {
        enabled: true,
      },

      recentActivity: {
        enabled: true,
        limit: 20,
        showPatients: true,
        showAppointments: true,
        showBilling: true,
        showInventory: false,
      },

      quickActions: {
        enabled: true,
      },
    },

    quickActions: {
      createPatient: { enabled: true },
      createVisit: { enabled: true },
      createAppointment: { enabled: true },
      createBill: { enabled: true },
      createDoctor: { enabled: false },
      addService: { enabled: false },
    },
  },
} as const;

export type Action = (typeof ACTIONS)[keyof typeof ACTIONS];
export type Resource = (typeof RESOURCES)[keyof typeof RESOURCES];