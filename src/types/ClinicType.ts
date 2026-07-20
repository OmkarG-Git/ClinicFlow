export interface ClinicType  {
    name: string,
      clinicType: string,
      
      phone: string,
      email: string,

      logoUrl?: string,

      address: string,
      city: string,
      state: string,
      postalCode: string,

      website?: string,
      gstNumber?: string,
      openingTime?: string,
      closingTime?: string,
      workingDays?: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
}