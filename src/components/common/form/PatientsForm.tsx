"use client"

import { ModalPortal } from "@/components/ModalPortal";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationStore } from "@/store/notification-store";
import { 
    User2, Mail, Phone, MapPin, Home, Building2, 
    Heart, AlertCircle, ClipboardList, Loader, X, 
    Calendar, Users, Briefcase, Stethoscope, Globe,
    UserPlus2, User, Droplet, Users2
} from "lucide-react";
import { 
    PatientFormValidation,
    type PatientFormValues
} from "@/lib/validations/patient.validation";
import { addPatient } from "@/actions/owner/patients";

type FormProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    description: string,
    clinicId?: string | null,
}

export function PatientForm({
    open,
    onClose,
    title,
    description,
    clinicId,
}: FormProps) {
    const notification = useNotificationStore();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm<PatientFormValues>({
        resolver: zodResolver(PatientFormValidation) as any, // Use 'as any' as a temporary fix
        defaultValues: {
            firstName: "",
            lastName: "",
            gender: null,
            age: null,
            dateOfBirth: null,
            bloodGroup: null,
            phone: "",
            email: null,
            occupation: null,
            maritalStatus: null,
            address: null,
            city: null,
            state: null,
            emergencyContactName: null,
            emergencyContactPhone: null,
            allergies: null,
            medicalNotes: null,
            isActive: true,
        }   
    });

    // Watch form values for conditional styling
    const firstNameWatch = watch("firstName");
    const lastNameWatch = watch("lastName");
    const phoneWatch = watch("phone");
    const emailWatch = watch("email");

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            reset({
                firstName: "",
                lastName: "",
                gender: null,
                age: null,
                dateOfBirth: null,
                bloodGroup: null,
                phone: "",
                email: null,
                occupation: null,
                maritalStatus: null,
                address: null,
                city: null,
                state: null,
                emergencyContactName: null,
                emergencyContactPhone: null,
                allergies: null,
                medicalNotes: null,
                isActive: true,
            });
        }
    }, [open, reset]);

    async function onSubmit(values: PatientFormValues) {
        setIsSubmitting(true);
        try {
            // Replace with your actual API call
            const response = await addPatient(values);

           if(response.success) {
                notification.success(response.message);
                return;
           } else {
             notification.error(response.message)
           }

            reset();
            onClose();
        } catch (error) {
            notification.error("An error occurred while creating the patient");
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (!open) return null;

    return (
        <ModalPortal>
            <div 
                onClick={onClose}
                className="fixed inset-0 flex items-center justify-center z-30 bg-black/70 p-5"
            >
                <div 
                    className="flex flex-col bg-card rounded-2xl text-muted-foreground max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex gap-4 p-3 justify-between sticky top-0 bg-card pb-4 border-b border-border z-10">
                        <div className="flex gap-4">
                            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                <UserPlus2 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">{title}</h2>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div>
                            <Button 
                                className="bg-muted hover:bg-muted/80"
                                onClick={onClose}
                                type="button"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <form 
                        className="flex flex-col mt-5 p-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information Section */}
                            <div className="col-span-full">
                                <h3 className="text-md font-semibold text-blue-600 flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Personal Information
                                </h3>
                                <hr className="mt-2 border-border" />
                            </div>

                            {/* First Name */}
                            <div>
                                <Label>
                                    First Name
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter first name"
                                        className={`pl-9 ${firstNameWatch && !errors.firstName ? "border border-green-400" : "bg-input"}`}
                                        {...register("firstName")}
                                    />
                                </div>
                                {errors.firstName && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <Label>
                                    Last Name
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter last name"
                                        className={`pl-9 ${lastNameWatch && !errors.lastName ? "border border-green-400" : "bg-input"}`}
                                        {...register("lastName")}
                                    />
                                </div>
                                {errors.lastName && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>

                            {/* Gender */}
                            <div>
                                <Label>
                                    Gender
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <select
                                        className={`w-full px-3 py-2 pl-9 rounded-lg border border-input bg-input focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        {...register("gender")}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                    <Users2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                </div>
                                {errors.gender && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.gender.message}
                                    </p>
                                )}
                            </div>

                            {/* Age */}
                            <div>
                                <Label>
                                    Age
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="number"
                                        placeholder="Enter age"
                                        className={`pl-9 bg-input`}
                                        {...register("age", { valueAsNumber: true })}
                                    />
                                </div>
                                {errors.age && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.age.message}
                                    </p>
                                )}
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <Label>
                                    Date of Birth
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="date"
                                        className={`pl-9 bg-input`}
                                        {...register("dateOfBirth")}
                                    />
                                </div>
                                {errors.dateOfBirth && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.dateOfBirth.message}
                                    </p>
                                )}
                            </div>

                            {/* Blood Group */}
                            <div>
                                <Label>
                                    Blood Group
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <select
                                        className={`w-full px-3 py-2 pl-9 rounded-lg border border-input bg-input focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        {...register("bloodGroup")}
                                    >
                                        <option value="">Select blood group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                    <Droplet className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                </div>
                                {errors.bloodGroup && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.bloodGroup.message}
                                    </p>
                                )}
                            </div>

                            {/* Marital Status */}
                            <div>
                                <Label>
                                    Marital Status
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <select
                                        className={`w-full px-3 py-2 pl-9 rounded-lg border border-input bg-input focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        {...register("maritalStatus")}
                                    >
                                        <option value="">Select marital status</option>
                                        <option value="SINGLE">Single</option>
                                        <option value="MARRIED">Married</option>
                                        <option value="DIVORCED">Divorced</option>
                                        <option value="WIDOWED">Widowed</option>
                                        <option value="SEPARATED">Separated</option>
                                    </select>
                                    <Heart className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                </div>
                                {errors.maritalStatus && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.maritalStatus.message}
                                    </p>
                                )}
                            </div>

                            {/* Contact Information Section */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-md font-semibold text-blue-600 flex items-center gap-2">
                                    <Phone className="h-4 w-4" />
                                    Contact Information
                                </h3>
                                <hr className="mt-2 border-border" />
                            </div>

                            {/* Phone */}
                            <div>
                                <Label>
                                    Phone
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="tel"
                                        placeholder="Enter phone number"
                                        className={`pl-9 ${phoneWatch && !errors.phone ? "border border-green-400" : "bg-input"}`}
                                        {...register("phone")}
                                    />
                                </div>
                                {errors.phone && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <Label>
                                    Email
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="email"
                                        placeholder="Enter email address"
                                        className={`pl-9 ${emailWatch && !errors.email ? "border border-green-400" : "bg-input"}`}
                                        {...register("email")}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Occupation */}
                            <div>
                                <Label>
                                    Occupation
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter occupation"
                                        className={`pl-9 bg-input`}
                                        {...register("occupation")}
                                    />
                                </div>
                                {errors.occupation && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.occupation.message}
                                    </p>
                                )}
                            </div>

                            {/* Address Information Section */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-md font-semibold text-blue-600 flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    Address Information
                                </h3>
                                <hr className="mt-2 border-border" />
                            </div>

                            {/* Address */}
                            <div>
                                <Label>
                                    Address
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Home className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <textarea
                                        className={`w-full px-3 py-2 pl-9 rounded-lg border border-input bg-input focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[80px]`}
                                        placeholder="Enter address"
                                        {...register("address")}
                                    />
                                </div>
                                {errors.address && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.address.message}
                                    </p>
                                )}
                            </div>

                            {/* City */}
                            <div>
                                <Label>
                                    City
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter city"
                                        className={`pl-9 bg-input`}
                                        {...register("city")}
                                    />
                                </div>
                                {errors.city && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.city.message}
                                    </p>
                                )}
                            </div>

                            {/* State */}
                            <div>
                                <Label>
                                    State
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter state"
                                        className={`pl-9 bg-input`}
                                        {...register("state")}
                                    />
                                </div>
                                {errors.state && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.state.message}
                                    </p>
                                )}
                            </div>

                            {/* Emergency Contact Section */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-md font-semibold text-blue-600 flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Emergency Contact
                                </h3>
                                <hr className="mt-2 border-border" />
                            </div>

                            {/* Emergency Contact Name */}
                            <div>
                                <Label>
                                    Emergency Contact Name
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter emergency contact name"
                                        className={`pl-9 bg-input`}
                                        {...register("emergencyContactName")}
                                    />
                                </div>
                                {errors.emergencyContactName && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.emergencyContactName.message}
                                    </p>
                                )}
                            </div>

                            {/* Emergency Contact Phone */}
                            <div>
                                <Label>
                                    Emergency Contact Phone
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="tel"
                                        placeholder="Enter emergency contact phone"
                                        className={`pl-9 bg-input`}
                                        {...register("emergencyContactPhone")}
                                    />
                                </div>
                                {errors.emergencyContactPhone && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.emergencyContactPhone.message}
                                    </p>
                                )}
                            </div>

                            {/* Medical Information Section */}
                            <div className="col-span-full mt-4">
                                <h3 className="text-md font-semibold text-blue-600 flex items-center gap-2">
                                    <Stethoscope className="h-4 w-4" />
                                    Medical Information
                                </h3>
                                <hr className="mt-2 border-border" />
                            </div>

                            {/* Allergies */}
                            <div>
                                <Label>
                                    Allergies
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <AlertCircle className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <textarea
                                        className={`w-full px-3 py-2 pl-9 rounded-lg border border-input bg-input focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[80px]`}
                                        placeholder="Enter allergies (e.g., penicillin, pollen)"
                                        {...register("allergies")}
                                    />
                                </div>
                                {errors.allergies && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.allergies.message}
                                    </p>
                                )}
                            </div>

                            {/* Medical Notes */}
                            <div>
                                <Label>
                                    Medical Notes
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="relative mt-2">
                                    <ClipboardList className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                    <textarea
                                        className={`w-full px-3 py-2 pl-9 rounded-lg border border-input bg-input focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[80px]`}
                                        placeholder="Enter any medical notes"
                                        {...register("medicalNotes")}
                                    />
                                </div>
                                {errors.medicalNotes && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.medicalNotes.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-border sticky bottom-0 bg-card">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="w-full sm:w-auto"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <Loader className="animate-spin" />
                                        Creating...
                                    </div>
                                ) : (
                                    <>
                                        <UserPlus2 className="h-4 w-4" />
                                        Create Patient
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </ModalPortal>
    )
}