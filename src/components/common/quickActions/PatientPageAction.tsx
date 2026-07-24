"use client"


import { UserPlus2 } from "lucide-react"
import { QuickAction, QuickActions } from "./QuickActions"
import { useState } from "react"
import { PatientForm } from "../form/PatientsForm"
import { useWorkspace } from "@/providers/WorkspaceProvider"

export function PatientActions({
    className
}: { className?: string }) {

    const [openPatientForm, setPatientForm] = useState(false);

    const currentUser = useWorkspace();

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
            <QuickActions Actions={quickAtions} className={className} />
        </div>
    )
}