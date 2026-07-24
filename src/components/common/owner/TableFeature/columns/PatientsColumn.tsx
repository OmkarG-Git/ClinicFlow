import { DataTableColumn } from "@/components/data-table";
import { Patients } from "../types/PatientsType";
import { 
    Mail, 
    Phone, 
    Calendar, 
    Clock,
    UserCircle,
} from "lucide-react";
import { FormatDate } from "@/lib/DateFormater/FormatDate";
import { PatientActions } from "../actions/PatientActions";
import { cn } from "@/lib/utils";

// Helper function to get gender color
const getGenderColor = (gender: string | null) => {
    switch (gender?.toLowerCase()) {
        case 'male':
            return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        case 'female':
            return 'text-pink-400 bg-pink-500/10 border-pink-500/20';
        default:
            return 'text-gray-400 bg-white/5 border-white/10';
    }
};

// Helper function to get age badge color
const getAgeColor = (age: number | null) => {
    if (age === null) return 'text-gray-400 bg-white/5 border-white/10';
    if (age < 18) return 'text-green-400 bg-green-500/10 border-green-500/20';
    if (age < 40) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
    if (age < 60) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
};

export const PatientColumn: DataTableColumn<Patients>[] = [

    {
        id: "id",
        header: "ID",
        cell: (patient) => (
            <div className="flex items-center gap-2">
                <div className="flex p-1 px-3 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 font-mono text-xs font-semibold text-emerald-400">
                    <span>{patient.patientCode || 'N/A'}</span>
                </div>
            </div>
        ),
    },

    {
        id: "name",
        header: "PATIENT",
        cell: (patient) => (
            <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full common-bg font-medium text-white">
                    <span className="text-sm">
                        {patient.firstName?.charAt(0)}{patient.lastName?.charAt(0)}
                    </span>
                </div>
                <div className="min-w-0">
                    <p className="font-medium text-white truncate">
                        {patient.firstName} {patient.lastName}
                    </p>
                    <div className="flex items-center gap-2">
                        <Mail className="h-3 w-3 text-white/30" />
                        <span className="text-xs text-white/50 truncate">
                            {patient.email}
                        </span>
                    </div>
                </div>
            </div>
        ),
    },

    {
        id: "detail",
        header: "GENDER / AGE",
        cell: (patient) => (
            <div className="flex items-center gap-2">
                {/* Gender Badge */}
                <div className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                    getGenderColor(patient.gender)
                )}>
                    <UserCircle className="h-3 w-3" />
                    {patient.gender || 'N/A'}
                </div>
                
                {/* Age Badge */}
                <div className={cn(
                    "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium",
                    getAgeColor(patient.age)
                )}>
                    <Clock className="h-3 w-3" />
                    {patient.age || 'N/A'}
                </div>
            </div>
        ),
    },

    {
        id: "contact",
        header: "CONTACT",
        cell: (staff) => (
            <div className="flex flex-col gap-1.5 text-xs">
                <div className="flex items-center gap-2 text-white/70">
                    <Mail className="h-3.5 w-3.5 text-white/30" />
                    <span className="truncate">{staff.email}</span>
                </div>
                {staff.phone && (
                    <div className="flex items-center gap-2 text-white/70">
                        <Phone className="h-3.5 w-3.5 text-white/30" />
                        <span>{staff.phone}</span>
                    </div>
                )}
            </div>
        ),
    },

    {
        id: "created_at",
        header: "JOINED",
        cell: (patient) => (
            <div className="flex items-center gap-2 text-sm text-white/70">
                <Calendar className="h-4 w-4 text-white/30" />
                <span className="font-mono text-xs">
                    {patient.updatedAt ? FormatDate.shortDate(patient.updatedAt) : 'N/A'}
                </span>
            </div>
        ),
    },

    {
        id: "actions",
        header: "",
        cell: (patient) => (
            <PatientActions patient={patient} />
        ),
    },
];