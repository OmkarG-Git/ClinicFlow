"use client"

import { MainState } from "./MainState";
import { motion } from "framer-motion";
import { Calendar, CalendarCheck, CheckCircle, XCircle, TrendingUp, Clock } from "lucide-react";
import { usePatients } from "@/components/hooks/usePatient";

export function PatientsStates() {
    
    const {
        stateData,
        stateLoading
    } = usePatients();

    // Define stats with icons and colors
    const containt = [
        {
            label: "Total Patients",
            value: stateData?.totalPatients,
            icon: Calendar,
            color: "from-blue-500 to-cyan-500",
            bgColor: "blue-500/10",
        },
        {
            label: "Today's Patients",
            value: stateData?.todaysPatients,
            icon: Clock,
            color: "from-purple-500 to-pink-500",
            bgColor: "purple-500/10",
        },
        {
            label: "New Patients",
            value: stateData?.newPatientsThisMonth,
            icon: CheckCircle,
            color: "from-emerald-500 to-green-500",
            bgColor: "emerald-500/10",
        },
    ];

    return(
        <div className="my-5">
            <MainState states={containt} loading={stateLoading} />
        </div>
    )
}