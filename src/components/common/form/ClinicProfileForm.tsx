"use client"

import { useState, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { Camera, Trash2, Upload, Building2, Phone, Mail, MapPin, Globe, CreditCard, Clock, CalendarDays } from "lucide-react";
import Image from "next/image"
import { Button } from "@/components/ui/button/Button";
import { Label } from "@/components/ui/label/label";
import { Input } from "@/components/ui/input/Input";
import { cn } from "@/lib/utils";

type ClinicFormData = {
    name: string;
    clinicType: string;
    phone: string;
    email: string;
    logoUrl: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
    website: string;
    gstNumber: string;
    openingTime: string;
    closingTime: string;
    workingDays: string[];
};

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function ClinicProfileForm() {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState("");
    const [uploading, setUploading] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ]);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<ClinicFormData>({
        defaultValues: {
            name: "",
            clinicType: "",
            phone: "",
            email: "",
            logoUrl: "",
            address: "",
            city: "",
            state: "",
            postalCode: "",
            website: "",
            gstNumber: "",
            openingTime: "09:00",
            closingTime: "18:00",
            workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        }
    });

    async function handleFile(file: File) {
        if (!file) return;

        if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
            alert("Only PNG, JPG and WEBP are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            alert("Maximum file size is 5MB.");
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setUploading(true);

        try {
            // Cloudinary upload comes next
            // const url = await uploadLogo(file);
            // temporary
            const url = objectUrl;
        } finally {
            setUploading(false);
        }
    }

    const onSubmit = async (data: ClinicFormData) => {
        console.log("Form data:", { ...data, workingDays: selectedDays });
        // Handle form submission
    };

    const toggleDay = (day: string) => {
        setSelectedDays(prev => 
            prev.includes(day) 
                ? prev.filter(d => d !== day)
                : [...prev, day]
        );
    };

    return (
        <div className="p-2">
            <div>
                <h1 className="text-2xl text-white font-semibold">
                    Update Your Clinic Profile
                </h1>
                <p className="text-white/50 text-sm">
                    Update profile to other user can see the updated detail
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-4">
                {/* Logo Upload */}
                <div className="flex flex-col items-center justify-center gap-3">
                    <div 
                        onClick={() => inputRef.current?.click()}
                        className="w-32 h-32 rounded-full overflow-hidden border-2 border-white/10 bg-white/5 flex items-center justify-center cursor-pointer hover:border-emerald-500/50 transition-all"
                    >
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Clinic Logo"
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Camera className="h-8 w-8 text-white/30" />
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => inputRef.current?.click()}
                            className="h-9 px-4 text-sm border-white/10 text-white/70 hover:bg-white/5"
                        >
                            <Upload className="mr-2 h-3.5 w-3.5" />
                            {preview ? "Change Logo" : "Upload Logo"}
                        </Button>

                        {preview && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => setPreview("")}
                                className="h-9 px-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            >
                                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                                Remove
                            </Button>
                        )}

                        {uploading && (
                            <span className="text-sm text-white/50 animate-pulse">
                                Uploading...
                            </span>
                        )}
                    </div>

                    <input
                        ref={inputRef}
                        hidden
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFile(file);
                            e.target.value = "";
                        }}
                    />
                </div>

                {/* Basic Information */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-emerald-400" />
                        <h2 className="text-lg font-semibold text-white">Basic Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">
                                Clinic Name <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                placeholder="Enter clinic name"
                                className={cn(
                                    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50",
                                    errors.name && "border-red-500/50"
                                )}
                                {...register("name", { required: "Clinic name is required" })}
                            />
                            {errors.name && (
                                <p className="text-xs text-red-400">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">
                                Clinic Type <span className="text-red-400">*</span>
                            </Label>
                            <select
                                className={cn(
                                    "w-full h-12 px-4 rounded-xl border bg-white/5 text-white placeholder:text-white/30 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 transition-all appearance-none",
                                    errors.clinicType ? "border-red-500/50" : "border-white/10"
                                )}
                                {...register("clinicType", { required: "Clinic type is required" })}
                            >
                                <option value="" className="bg-slate-800">Select clinic type</option>
                                <option value="GENERAL" className="bg-slate-800">General</option>
                                <option value="DENTAL" className="bg-slate-800">Dental</option>
                                <option value="EYE" className="bg-slate-800">Eye</option>
                                <option value="ENT" className="bg-slate-800">ENT</option>
                                <option value="ORTHOPEDIC" className="bg-slate-800">Orthopedic</option>
                                <option value="PEDIATRIC" className="bg-slate-800">Pediatric</option>
                                <option value="PHYSIOTHERAPY" className="bg-slate-800">Physiotherapy</option>
                                <option value="SKIN" className="bg-slate-800">Skin</option>
                            </select>
                            {errors.clinicType && (
                                <p className="text-xs text-red-400">{errors.clinicType.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-emerald-400" />
                        <h2 className="text-lg font-semibold text-white">Contact Information</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">
                                Phone <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                type="tel"
                                placeholder="Enter phone number"
                                className={cn(
                                    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50",
                                    errors.phone && "border-red-500/50"
                                )}
                                {...register("phone", { required: "Phone number is required" })}
                            />
                            {errors.phone && (
                                <p className="text-xs text-red-400">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">
                                Email <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                type="email"
                                placeholder="Enter email address"
                                className={cn(
                                    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50",
                                    errors.email && "border-red-500/50"
                                )}
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && (
                                <p className="text-xs text-red-400">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">Website</Label>
                            <Input
                                placeholder="Enter website URL"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                                {...register("website")}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">GST Number</Label>
                            <Input
                                placeholder="Enter GST number"
                                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50"
                                {...register("gstNumber")}
                            />
                        </div>
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-emerald-400" />
                        <h2 className="text-lg font-semibold text-white">Address</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">
                                Address <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                placeholder="Enter street address"
                                className={cn(
                                    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50",
                                    errors.address && "border-red-500/50"
                                )}
                                {...register("address", { required: "Address is required" })}
                            />
                            {errors.address && (
                                <p className="text-xs text-red-400">{errors.address.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">
                                City <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                placeholder="Enter city"
                                className={cn(
                                    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50",
                                    errors.city && "border-red-500/50"
                                )}
                                {...register("city", { required: "City is required" })}
                            />
                            {errors.city && (
                                <p className="text-xs text-red-400">{errors.city.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">
                                State <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                placeholder="Enter state"
                                className={cn(
                                    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50",
                                    errors.state && "border-red-500/50"
                                )}
                                {...register("state", { required: "State is required" })}
                            />
                            {errors.state && (
                                <p className="text-xs text-red-400">{errors.state.message}</p>
                            )}
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">
                                Postal Code <span className="text-red-400">*</span>
                            </Label>
                            <Input
                                placeholder="Enter postal code"
                                className={cn(
                                    "bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-emerald-500/50",
                                    errors.postalCode && "border-red-500/50"
                                )}
                                {...register("postalCode", { required: "Postal code is required" })}
                            />
                            {errors.postalCode && (
                                <p className="text-xs text-red-400">{errors.postalCode.message}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Working Hours */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-emerald-400" />
                        <h2 className="text-lg font-semibold text-white">Working Hours</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">Opening Time</Label>
                            <Input
                                type="time"
                                className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50"
                                {...register("openingTime")}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label className="text-sm font-medium text-white/70">Closing Time</Label>
                            <Input
                                type="time"
                                className="bg-white/5 border-white/10 text-white focus:border-emerald-500/50"
                                {...register("closingTime")}
                            />
                        </div>
                    </div>
                </div>

                {/* Working Days */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-emerald-400" />
                        <h2 className="text-lg font-semibold text-white">Working Days</h2>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                        {DAYS.map((day) => (
                            <button
                                key={day}
                                type="button"
                                onClick={() => toggleDay(day)}
                                className={cn(
                                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                                    selectedDays.includes(day)
                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                        : "bg-white/5 text-white/40 border border-white/10 hover:bg-white/10 hover:text-white/70"
                                )}
                            >
                                {day}
                            </button>
                        ))}
                    </div>
                    <input
                        type="hidden"
                        {...register("workingDays")}
                        value={selectedDays.join(",")}
                    />
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                    <Button
                        type="button"
                        variant="outline"
                        className="border-white/10 text-white/60 hover:text-white hover:bg-white/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                    >
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
            </form>
        </div>
    );
}