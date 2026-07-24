"use client"

import { useAppointment } from "@/components/hooks/useAppointment";
import { appointmentStateType } from "../TableFeature/types/AppointmentType";
import { MainState } from "./MainState";
import { motion } from "framer-motion";
import { Calendar, CalendarCheck, CheckCircle, XCircle, TrendingUp, Clock } from "lucide-react";

export function AppointmentStates() {
    
    const {
        stateData,
        stateLoading
    } = useAppointment();

    // Define stats with icons and colors
    const containt = [
        {
            label: "Total Appointments",
            value: stateData?.totalAppointments,
            icon: Calendar,
            color: "from-blue-500 to-cyan-500",
            bgColor: "blue-500/10",
        },
        {
            label: "Today's Appointments",
            value: stateData?.todayAppointments,
            icon: Clock,
            color: "from-purple-500 to-pink-500",
            bgColor: "purple-500/10",
        },
        {
            label: "Completed",
            value: stateData?.completed,
            icon: CheckCircle,
            color: "from-emerald-500 to-green-500",
            bgColor: "emerald-500/10",
        },
        {
            label: "Cancelled",
            value: stateData?.cancelled,
            icon: XCircle,
            color: "from-red-500 to-orange-500",
            bgColor: "red-500/10",
        },
    ];

    return(
        <div className="my-5">
            <MainState states={containt} loading={stateLoading} />
        </div>
    )
}