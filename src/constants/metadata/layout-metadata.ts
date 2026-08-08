export const SIDEBAR_METADATA = {
  dashboard: {
    title: "Dashboard",
    description:
      "Display the dashboard in the sidebar navigation.",
  },

  patients: {
    title: "Patients",
    description:
      "Access patient records and profiles.",
  },

  visits: {
    title: "Visits",
    description:
      "Manage patient visits and consultations.",
  },

  appointments: {
    title: "Appointments",
    description:
      "Schedule and manage appointments.",
  },

  doctors: {
    title: "Doctors",
    description:
      "Manage doctor profiles and availability.",
  },

  receptionists: {
    title: "Receptionists",
    description:
      "Manage receptionist accounts.",
  },

  services: {
    title: "Services",
    description:
      "Configure clinic services and pricing.",
  },

  billing: {
    title: "Billing",
    description:
      "Access billing and payment management.",
  },

  inventory: {
    title: "Inventory",
    description:
      "Manage medicines and stock.",
  },

  reports: {
    title: "Reports",
    description:
      "View clinic reports and analytics.",
  },

  settings: {
    title: "Settings",
    description:
      "Access clinic configuration.",
  },
} as const;

export const DASHBOARD_METADATA = {
  revenueChart: {
    title: "Revenue Chart",
    description:
      "Display clinic revenue over time.",
  },

  weeklyVisitsChart: {
    title: "Weekly Visits Chart",
    description:
      "Show patient visits throughout the week.",
  },

  todayVisits: {
    title: "Today's Visits",
    description:
      "Display today's appointments and visits.",
  },

  upcomingAppointments: {
    title: "Upcoming Appointments",
    description:
      "Show upcoming scheduled appointments.",
  },

  pendingBills: {
    title: "Pending Bills",
    description:
      "Display unpaid invoices requiring attention.",
  },

  inventoryAlerts: {
    title: "Inventory Alerts",
    description:
      "Notify when stock is running low.",
  },

  doctorPerformance: {
    title: "Doctor Performance",
    description:
      "Show doctor workload and activity.",
  },

  patientGrowth: {
    title: "Patient Growth",
    description:
      "Track new patient registrations.",
  },

  topServices: {
    title: "Top Services",
    description:
      "Display the most frequently used services.",
  },

  calendar: {
    title: "Calendar",
    description:
      "Show the appointment calendar widget.",
  },

  recentActivity: {
    title: "Recent Activity",
    description:
      "Display recent clinic activities on the dashboard.",
  },

  quickActions: {
    title: "Quick Actions",
    description:
      "Display shortcut buttons for common tasks.",
  },
} as const;

export const QUICK_ACTION_METADATA = {
  createPatient: {
    title: "Create Patient",
    description:
      "Allow quick patient registration.",
  },

  createVisit: {
    title: "Create Visit",
    description:
      "Start a new patient visit quickly.",
  },

  createAppointment: {
    title: "Create Appointment",
    description:
      "Book a new appointment from the dashboard.",
  },

  createBill: {
    title: "Create Bill",
    description:
      "Generate a new invoice quickly.",
  },

  createDoctor: {
    title: "Create Doctor",
    description:
      "Add a new doctor profile.",
  },

  addService: {
    title: "Add Service",
    description:
      "Create a new clinic service.",
  },
} as const; 