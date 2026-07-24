import { AppointmentStatus } from "@/db/schema";
import { AppointmentType } from "@/db/schema";

export interface appointmentType {
    id: string;

    appointmentDate: string;
    appointmentStartTime: string;
    appointmentEndTime: string;

    status: AppointmentStatus
    type: AppointmentType;

    patientId: string | null;
    patientFirstName: string | null;
    patientLastName: string | null;

    doctorId: string | null;
    doctorFirstName: string | null;
    doctorLastName: string | null;
}


export interface appointmentStateType {

    totalAppointments: number;
    todayAppointments: number;
    completed:number
    cancelled:number
}