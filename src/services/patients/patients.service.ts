import { PatientFormValues } from "@/lib/validations/patient.validation";
import { Patients } from "@/repositories/patients/patients";
import { PaginationOptions } from "@/types/pagination";

export async function getPatientsSearchService(
    query: string,
    clinicId: string | null
) {

    return await Patients.findByQuery(
        query,
        clinicId
    );
}

export async function addPatientService(
    values: PatientFormValues,
    clinicId: string | null
) {
    return await Patients.InsertPatient(
        values,
        clinicId
    );
}


export async function getPatientsService(
    filter: PaginationOptions,
    clinicId: string | null
) {
    return await Patients.findMany(
        filter,
        clinicId
    );
}

export async function getPatientState(
    clinicId: string | null
) {
    return await Patients.getPatientState(
        clinicId
    )
};