import { permissionActionType, permissionResourceType, UserRole } from "@/db/schema";


export interface Permission  {
    id: string;
    createdAt: Date;
    clinicId: string;
    role: UserRole;
    resource: permissionResourceType;
    action: permissionActionType;
    allowed: boolean;
}