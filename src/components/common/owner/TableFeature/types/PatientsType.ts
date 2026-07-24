import { BloodGroup, Gender } from "@/db/schema"

export interface Patients {
    patientCode: string,

    firstName: string,

    lastName: string | null,

    age: number | null,

    gender: Gender | null,

    phone: string,

    email: string | null,

    bloodGroup: BloodGroup | null,

    updatedAt: Date
}


export interface PatientState {
    totalPatients: number,
    todaysPatients: number,
    newPatientsThisMonth: number,
}