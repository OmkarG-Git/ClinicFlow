"use client"


import { Calendar, UserPlus2 } from "lucide-react"
import { QuickAction, QuickActions } from "./QuickActions"
import { useState } from "react"
import { AppointmentForm } from "../form/AppointmentForm"
import { PatientForm } from "../form/PatientsForm"
import { useWorkspace } from "@/providers/WorkspaceProvider"
import { QUICK_ACTIONS } from "@/constants/quick-actions"
import { can } from "@/lib/utils/FilteredAction"
import { useClinicConfigurationStore } from "@/store/clinic-configuration-store"

export function AppointmentActions({
    className
}: { className?: string }) {

    const [openAppointmentForm, setAppointmentForm] = useState(false)
    const [openPatientForm, setPatientForm] = useState(false);

    const { permissionMap } =
        useClinicConfigurationStore();

    const currentUser = useWorkspace();

    const Actions = ["createPatient", "createReceptionist"];

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
            <AppointmentForm
                open={openAppointmentForm}
                onClose={() => setAppointmentForm(!openAppointmentForm)}
                title="Create Appointment"
                description=""
            />

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