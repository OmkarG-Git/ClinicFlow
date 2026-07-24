import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { appointmentType } from "../types/AppointmentType";

interface AppointmentActionsProps {
    appointment: appointmentType;
}

export function AppointmentActions({
    appointment,
}: AppointmentActionsProps) {

    return (

        <Button
            variant="ghost"
            size="icon"
        >
            <MoreHorizontal className="h-4 w-4" />
        </Button>

    );

}