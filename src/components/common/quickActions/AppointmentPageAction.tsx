"use client"


import { Calendar, UserPlus2 } from "lucide-react"
import { QuickAction, QuickActions } from "./QuickActions"
import { useState } from "react"
import { AppointmentForm } from "../form/AppointmentForm"
import { PatientForm } from "../form/PatientsForm"
import { useWorkspace } from "@/providers/WorkspaceProvider"

export function AppointmentActions({
    className
}: { className?: string }) {

    const [openAppointmentForm, setAppointmentForm] = useState(false)
    const [openPatientForm, setPatientForm] = useState(false);

    const currentUser = useWorkspace();

    const quickAtions: QuickAction[] = [
        { 
            icon: Calendar, 
            label: "Add Appointment", 
            handler: () => {
                setAppointmentForm(true) 
            }
        },
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
            <QuickActions Actions={quickAtions} className={className} />
        </div>
    )
}