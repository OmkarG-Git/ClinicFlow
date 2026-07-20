
export interface CurrentUser {
    id: string;
    role: "SUPER_ADMIN" | "OWNER" | "DOCTOR" | "RECEPTIONIST";
    email: string;
    isActive: boolean;
    clinicId: string | null;
    isOnboarded: boolean;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    clinic: {
        id: string;
        name: string;
        clinicType: "GENERAL" | "DENTAL" | "EYE" | "ENT" | "ORTHOPEDIC" | "PEDIATRIC" | "PHYSIOTHERAPY" | "SKIN";
        logoUrl: string | null;
    } | null;
}