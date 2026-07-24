import { UserRole } from "@/db/schema";
import { appointmentSchemaType } from "@/lib/validations/appointment.validation";
import { Appointment } from "@/repositories/appointment/appointment";
import { PaginationOptions } from "@/types/pagination";


export function getAppintmentsService(
    clinicId: string | null,
    role: UserRole,
    userId: string,
    options: PaginationOptions,
){

    return Appointment.findMany(
        clinicId,
        role,
        userId,
        options
    )
}

export function InsertAppointmentService(
    values: appointmentSchemaType,
    clinicId: string | null
) {

    return Appointment.InsertOne(
        values,
        clinicId,
    )
}

export async function getAppointmentsStatsService(
    clinicId: string | null,
    role: UserRole,
    userId: string,
) {
    return await Appointment.getStatsData(
        clinicId,
        role,
        userId
    );
}