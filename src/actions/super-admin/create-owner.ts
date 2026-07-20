"use server";

import {
  createOwnerSchema,
  type CreateOwnerSchema,
} from "@/lib/validations/owner.validation";

import { AddClinicOwner } from "@/services/super-admin/createOwner.service";

export async function createOwnerAction(
  values: CreateOwnerSchema
) {
  const validatedData = createOwnerSchema.parse(values);

   const response = await AddClinicOwner(validatedData)

   if(response?.success) {
       return {
         success: true,
         message: response?.message,
       };
   } else {
    throw new Error(response?.message)
   }

}