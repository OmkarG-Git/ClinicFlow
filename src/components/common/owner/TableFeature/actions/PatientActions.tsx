import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { Patients } from "../types/PatientsType";

interface PatientActionsProps {
    patient: Patients;
}

export function PatientActions({
    patient,
}: PatientActionsProps) {

    return (

        <Button
            variant="ghost"
            size="icon"
        >
            <MoreHorizontal className="h-4 w-4" />
        </Button>

    );

}