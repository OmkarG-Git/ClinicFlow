"use client"

import { ModalPortal } from "@/components/ModalPortal";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationStore } from "@/store/notification-store";
import { Calendar, Clock, User2, Loader, X, Stethoscope, ClipboardList } from "lucide-react";
import { SearchableSelect } from "../inputs/SearchableSelect";
import { 
    appointmentValidationSchema,
    type appointmentSchemaType
} from "@/lib/validations/appointment.validation";
import { getPatients } from "@/actions/owner/patients";
import { getDoctorBySearch } from "@/actions/owner/doctors";
import { InsertAppointment } from "@/actions/owner/appointments";

// Types for options
type PatientOption = {
    id: string;
    name: string;
}

type DoctorOption = {
    id: string;
    name: string;
}

type FormProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    description: string,
}

export function AppointmentForm({
    open,
    onClose,
    title,
    description,
}: FormProps) {
    const notification = useNotificationStore();
    const [patientSearch, setPatientSearch] = useState("");
    const [doctorSearch, setDoctorSearch] = useState("");
    const [patientsLoading, setPatientsLoading] = useState(false);
    const [doctorsLoading, setDoctorsLoading] = useState(false);
    const [patients, setPatients] = useState<PatientOption[]>([]);
    const [doctors, setDoctors] = useState<DoctorOption[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
        reset,
        setValue,
        setError,
        clearErrors
    } = useForm<appointmentSchemaType>({
        resolver: zodResolver(appointmentValidationSchema),
        defaultValues: {
            patientId: "",
            doctorId: "",
            appointmentDate: "",
            startTime: "",
            endTime: "",
            appointmentType: "CHECKUP",
            notes: "",
        }   
    });

    console.log("my form submiting errors", errors);

    // Watch form values for conditional styling
    const patientIdWatch = watch("patientId");
    const doctorIdWatch = watch("doctorId");
    const dateWatch = watch("appointmentDate");
    const timeWatch = watch("startTime");
    const endTimeWatch = watch("endTime");
    const typeWatch = watch("appointmentType");

    // Fetch patients on search
    useEffect(() => {
        if(!open) return
        const fetchPatients = async () => {
            setPatientsLoading(true);
            try {
                const response = await getPatients(patientSearch);
                if(response.data) {
                    setPatients(response.data.map((p: any) => ({
                        id: p.id,
                        name: `${p.firstName} ${p.lastName}`,
                    })));
                }
            } catch (error) {
                console.error("Error fetching patients:", error);
            } finally {
                setPatientsLoading(false);
            }
        };

        const timeout = setTimeout(fetchPatients, 300);
        return () => clearTimeout(timeout);
    }, [patientSearch, open]);

    // Fetch doctors on search
    useEffect(() => {
        if(!open) return
        const fetchDoctors = async () => {
            setDoctorsLoading(true);
            try {
                // Replace with your actual API call
                const response = await getDoctorBySearch(doctorSearch);
                if(response.success && response.data) {
                    setDoctors(response.data.map((d: any) => ({
                        id: d.id,
                        name: `Dr. ${d.firstName} ${d.lastName}`
                    })));
                } else if(response.errors) {
                    notification.error(response.message)
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setDoctorsLoading(false);
            }
        };

        const timeout = setTimeout(fetchDoctors, 300);
        return () => clearTimeout(timeout);
    }, [doctorSearch, open]);

    // Reset form when modal opens
    useEffect(() => {
        if (open) {
            reset({
                patientId: "",
                doctorId: "",
                appointmentDate: "",
                startTime: "",
                endTime: "",
                appointmentType: "CHECKUP",
                notes: "",
            });
            setPatientSearch("");
            setDoctorSearch("");
        }
    }, [open, reset]);

    async function onSubmit(values: appointmentSchemaType) {
        try {
            // Replace with your actual API call
            const response = await InsertAppointment(values);
            if(response?.success) {
                notification.success(response.message)
                return;
            } else {
                if(response) {
                    notification.error(response.message);
                }
            }

            reset();
            onClose();
        } catch (error) {
            notification.error("An error occurred while creating the appointment");
            console.error(error);
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
                    className="flex flex-col bg-card p-5 rounded-2xl text-muted-foreground max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex gap-4 justify-between">
                        <div className="flex gap-4">
                            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20">
                                <ClipboardList className="h-6 w-6 text-blue-600" />
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
                                <X />
                            </Button>
                        </div>
                    </div>

                    <form 
                        className="flex flex-col mt-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Select Patient */}
                            <div className="col-span-full">
                                <Label>
                                    Select Patient
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <SearchableSelect
                                        value={patientIdWatch}
                                        options={patients.map(p => ({
                                            value: p.id,
                                            label: `${p.name}`
                                        }))}
                                        loading={patientsLoading}
                                        onSearch={setPatientSearch}
                                        onChange={(value) => {
                                            setValue("patientId", value);
                                            if (value) clearErrors("patientId");
                                        }}
                                        placeholder="Search patient by name or code..."
                                        className={`pl-9 ${patientIdWatch && !errors.patientId ? "border border-green-400" : "bg-input"}`}
                                    />
                                </div>
                                {errors.patientId && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.patientId.message}
                                    </p>
                                )}
                            </div>

                            {/* Select Doctor */}
                            <div className="col-span-full">
                                <Label>
                                    Select Doctor
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <SearchableSelect
                                        value={doctorIdWatch}
                                        options={doctors.map(d => ({
                                            value: d.id,
                                            label: `${d.name}`
                                        }))}
                                        loading={doctorsLoading}
                                        onSearch={setDoctorSearch}
                                        onChange={(value) => {
                                            setValue("doctorId", value);
                                            if (value) clearErrors("doctorId");
                                        }}
                                        placeholder="Search doctor by name or specialization..."
                                        className={`pl-9 ${doctorIdWatch && !errors.doctorId ? "border border-green-400" : "bg-input"}`}
                                    />
                                </div>
                                {errors.doctorId && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.doctorId.message}
                                    </p>
                                )}
                            </div>

                            {/* Date */}
                            <div>
                                <Label>
                                    Appointment Date
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="date"
                                        className={`pl-9 ${dateWatch && !errors.appointmentDate ? "border border-green-400" : "bg-input"}`}
                                        {...register("appointmentDate")}
                                    />
                                </div>
                                {errors.appointmentDate && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.appointmentDate.message}
                                    </p>
                                )}
                            </div>

                            {/* Appointment Type */}
                            <div className="">
                                <Label>
                                    Appointment Type
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <select
                                        className={`w-full px-3 py-2 pl-9 rounded-lg border ${typeWatch && !errors.appointmentType ? "border-green-400" : "border-input"} bg-input focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
                                        {...register("appointmentType")}
                                    >
                                        <option value="CONSULTATION">Consultation</option>
                                        <option value="FOLLOW_UP">Follow-up</option>
                                        <option value="CHECKUP">General Checkup</option>
                                        <option value="EMERGENCY">Emergency</option>
                                        <option value="WALK_IN">Walk-in</option>
                                        <option value="ONLINE">Online</option>
                                        <option value="PROCEDURE">Procedure</option>
                                        <option value="LAB_REVIEW">Lab Review</option>
                                    </select>
                                    <ClipboardList className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                </div>
                                {errors.appointmentType && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.appointmentType.message}
                                    </p>
                                )}
                            </div>

                            {/* Time */}
                            <div>
                                <Label>
                                    Appointment Start Time
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="time"
                                        className={`pl-9 ${timeWatch && !errors.startTime ? "border border-green-400" : "bg-input"}`}
                                        {...register("startTime")}
                                    />
                                </div>
                                {errors.startTime && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.startTime.message}
                                    </p>
                                )}
                            </div>

                             {/* End time */}
                             <div>
                                <Label>
                                    Appointment End Time
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        type="time"
                                        className={`pl-9 ${endTimeWatch && !errors.endTime ? "border border-green-400" : "bg-input"}`}
                                        {...register("endTime")}
                                    />
                                </div>
                                {errors.endTime && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.endTime.message}
                                    </p>
                                )}
                            </div>


                            {/* Notes */}
                            <div className="col-span-full">
                                <Label>
                                    Additional Notes
                                    <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                                </Label>
                                <div className="mt-2">
                                    <textarea
                                        className={`w-full px-3 py-2 rounded-lg border border-input bg-input focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[80px]`}
                                        placeholder="Add any additional notes or special requirements..."
                                        {...register("notes")}
                                    />
                                </div>
                                {errors.notes && (
                                    <p className="text-xs text-red-500 flex items-center gap-1 mt-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.notes.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
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
                                        <ClipboardList className="h-4 w-4" />
                                        Create Appointment
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