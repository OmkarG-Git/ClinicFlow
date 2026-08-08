"use client"


import { UserPlus2 } from "lucide-react"
import { QuickAction, QuickActions } from "./QuickActions"
import { useState } from "react"
import { PatientForm } from "../form/PatientsForm"
import { useWorkspace } from "@/providers/WorkspaceProvider"
import { QUICK_ACTIONS } from "@/constants/quick-actions"
import { useClinicConfigurationStore } from "@/store/clinic-configuration-store"
import { can } from "@/lib/utils/FilteredAction"

export function PatientActions({
    className
}: { className?: string }) {

    const [openPatientForm, setPatientForm] = useState(false);

    const { layout, permissionMap, permissions } =
        useClinicConfigurationStore(); 

    const currentUser = useWorkspace();

    const Actions = ["createPatient"];

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

    const quickAtions: QuickAction[] = [
        {
            icon: UserPlus2,
            label: "Add Patient",
            handler: () => {
                setPatientForm(true)
            }
        },
    ]

    return(
        <div>
            <PatientForm 
                open={openPatientForm}
                onClose={() => setPatientForm(!openPatientForm)}
                title="Fill patient details"
                description=""
                clinicId={currentUser.clinicId}
            />
            <QuickActions actions={visibleQuickActions} className={className} />
        </div>
    )
}