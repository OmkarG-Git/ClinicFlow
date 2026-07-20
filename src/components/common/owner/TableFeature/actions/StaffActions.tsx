import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button/Button";
import { Staff } from "../types/StaffType";

interface StaffActionsProps {
    staff: Staff;
}

export function StaffActions({
    staff,
}: StaffActionsProps) {

    return (

        <Button
            variant="ghost"
            size="icon"
        >
            <MoreHorizontal className="h-4 w-4" />
        </Button>

    );

}