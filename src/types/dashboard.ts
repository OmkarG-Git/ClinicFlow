export interface DashboardStats {

    totalPatients: number;

    totalDoctors: number;

    totalReceptionists: number;

    todayVisits: number;

    todayAppointments: number;

    totalRevenue: number;
}


export interface RecentPatient {

    id: string;

    name: string;

    avatarUrl: string | null;

    phone: string | null;

    lastVisit: Date | null;
}

export interface ActivityItem {

    id: string;

    title: string;

    description: string;

    createdAt: Date;
}

export interface DashboardData {

    stats: DashboardStats | null | undefined;

    recentPatients: RecentPatient[];

    activities: ActivityItem[];
}