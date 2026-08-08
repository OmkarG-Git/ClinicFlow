"use client"

import { QuickAction, QuickActions } from "./QuickActions"
import { Stethoscope, UserPlus2 } from "lucide-react"
import { useState } from "react"
import { UserRole } from "@/db/schema"
import { RecepstionistAndDoctoreCreatingForm } from "../form/CommonUserCreatingForm"
import { useWorkspace } from "@/providers/WorkspaceProvider"
import { QUICK_ACTIONS } from "@/constants/quick-actions"
import { can } from "@/lib/utils/FilteredAction"
import { useClinicConfigurationStore } from "@/store/clinic-configuration-store"


export function StaffAction({
    className
}: {className: string}
) {

    const currentUser = useWorkspace();

    //   const [openAddNewUserForm, setAddNewUserForm] = useState<{
    //     status: boolean;
    //     title: string;
    //     descrition: string;
    //     role: Extract<UserRole, "DOCTOR" | "RECEPTIONIST"> | undefined;
    //   }>({
    //     status: false,
    //     title: "",
    //     descrition: "",
    //     role: undefined,
    //   });

      const { layout, permissionMap, permissions } =
              useClinicConfigurationStore(); 

      const Actions = ["createDoctor", "createReceptionist"];

      const visibleQuickActions = 
        QUICK_ACTIONS.filter((item) => {
             if(!Actions.includes(item.id)) return;
            
                const hasPermission = 
                    can(
                        currentUser.role,
                        permissionMap,
                        item.resource,
                        item.permission
                    );
    
                return hasPermission;
        })


    return(
        <div>
            {/* <RecepstionistAndDoctoreCreatingForm 
                open={openAddNewUserForm.status}
                onClose={() => setAddNewUserForm({
                    status: false,
                    title: "",
                    descrition: "",
                    role: undefined,
                })}
                title={openAddNewUserForm.title}
                description={openAddNewUserForm.descrition}
                role={openAddNewUserForm.role}
                ClinicId={currentUser.clinicId}
            /> */}

            <QuickActions className={`flex ${className} gap-2`} actions={visibleQuickActions} />
        </div>
    )

}