"use client"

import { useStaff } from "@/components/hooks/useStaff";
import { MainState } from "./MainState";
import { 
    Users, 
    UserCircle, 
    UserCog, 
    UserCheck,
    Stethoscope,
    UserPlus,
    UserMinus,
    Activity
} from "lucide-react";

export function StaffState() {

    const {
        stateData,
        stateLoading
    } = useStaff()

    console.log("my staff data", stateData);

    const containt = [
        {
            label: "Total Staff",
            value: stateData?.totalStaff,
            icon: Users,
            color: "from-blue-500 to-indigo-500",
            bgColor: "blue-500/10",
            description: "All staff members",
        },
        {
            label: "Doctors",
            value: stateData?.totalDoctors,
            icon: Stethoscope,
            color: "from-emerald-500 to-teal-500",
            bgColor: "emerald-500/10",
            description: "Medical professionals",
        },
        {
            label: "Receptionists",
            value: stateData?.totalReceptionists,
            icon: UserCog,
            color: "from-purple-500 to-pink-500",
            bgColor: "purple-500/10",
            description: "Front desk staff",
        },
        {
            label: "Active Staff",
            value: stateData?.activeStaff,
            icon: UserCheck,
            color: "from-green-500 to-emerald-500",
            bgColor: "green-500/10",
            description: "Currently working",
        },
    ];

    return(
        <div className="my-5">
            <MainState states={containt} loading={stateLoading} />
        </div>
    )
}