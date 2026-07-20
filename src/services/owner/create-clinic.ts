import { db } from "@/db";
import { clinics } from "@/db/schema";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

import type { ClinicSchema } from "@/lib/validations/clinic.validation";

type CreateClinicInput = {
  name: string;
  clinicType: ClinicSchema["clinicType"];
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  logoUrl?: string;
  website?: string;
  gstNumber?: string;
  workingDays?: string[];
  openingTime?: string;
  closingTime?: string;
};

export async function createClinic(
  data: CreateClinicInput,
  ownerId: string,
) {
 try {
   const [clinic] = await db
    .insert(clinics)
    .values({
      name: data.name,
      clinicType: data.clinicType,
      phone: data.phone,
      
      email: data.email?.trim() || "",
      address: data.address?.trim() || undefined,
      city: data.city?.trim() || undefined,
      state: data.state?.trim() || undefined,
      postalCode: data.postalCode?.trim() || undefined,

      logoUrl: data.logoUrl || undefined,
      website: data.website,
      gstNumber: data.gstNumber,

      workingDays: data.workingDays,

      openingTime: data.openingTime,
      closingTime: data.closingTime,
    })
    .returning();


    await db
      .update(users)
      .set({
        clinicId: clinic?.id,
        isOnboarded: true,
      })
      .where(eq(users.id, ownerId));
      

  return {
    success: true,
    message: "Clinic data stored successfully",
    clinic
  };

 } catch (error: any) {
    return {
      message: error.message
    }
 }
}