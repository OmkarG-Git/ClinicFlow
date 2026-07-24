"use client"

import { QuickAction, QuickActions } from "./QuickActions"
import { Stethoscope, UserPlus2 } from "lucide-react"
import { useState } from "react"
import { UserRole } from "@/db/schema"
import { RecepstionistAndDoctoreCreatingForm } from "../form/CommonUserCreatingForm"
import { useWorkspace } from "@/providers/WorkspaceProvider"


export function StaffAction({
    className
}: {className: string}
) {

    const currentUser = useWorkspace();

      const [openAddNewUserForm, setAddNewUserForm] = useState<{
        status: boolean;
        title: string;
        descrition: string;
        role: Extract<UserRole, "DOCTOR" | "RECEPTIONIST"> | "";
      }>({
        status: false,
        title: "",
        descrition: "",
        role: "",
      });

    const quickAtions: QuickAction[] = [
        { 
            icon: Stethoscope, 
            label: "Add Doctor", 
            handler: () => setAddNewUserForm({
                status: true,
                title: "Add Doctor",
                descrition: "Create a new doctor account for your clinic.",
                role: "DOCTOR",
            }) 
        },
        {
            icon: UserPlus2,
            label: "Add Receptionist",
            handler: () => setAddNewUserForm({
                status:true,
                title: "Add Receptionist",
                descrition: "Create a new receptionist account for your clinic.",
                role: "RECEPTIONIST"
            })
        },
    ]

    return(
        <div>
            <RecepstionistAndDoctoreCreatingForm 
                open={openAddNewUserForm.status}
                onClose={() => setAddNewUserForm({
                    status: false,
                    title: "",
                    descrition: "",
                    role: "",
                })}
                title={openAddNewUserForm.title}
                description={openAddNewUserForm.descrition}
                role={openAddNewUserForm.role}
                ClinicId={currentUser.clinicId}
            />

            <QuickActions className={`flex ${className} gap-2`} Actions={quickAtions} />
        </div>
    )

}