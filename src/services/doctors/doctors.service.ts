import { Doctors } from "@/repositories/staff/doctors";
    
export async function getDoctorByQuery(
    query: string,
    clinicId: string | null
){

    return Doctors.findByQuery(
        query,
        clinicId
    )
}