"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Globe,
  Clock,
  CheckCircle,
  ArrowRight,
  Loader2,
  Store,
  Stethoscope,
  HeartPulse,
  Users,
  Syringe,
  Ambulance,
  Pill,
  Microscope,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";

import { LogoUploader } from "./LogoUploader";

import { useRouter } from "next/navigation"

import { useNotificationStore } from "@/store/notification-store";

import {
  clinicSchema,
  type ClinicSchema,
} from "@/lib/validations/clinic.validation";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/label/label";
import { RegisterOwnerClinic } from "@/actions/owner/register";
import { ClinicType } from "@/types/ClinicType";
import { uploadFile } from "@/lib/cloudinary/uploadClinicLogo";

const clinicIcons = [
  { icon: HeartPulse, color: "text-rose-200", size: "w-32 h-32", top: "10%", left: "3%", delay: 0 },
  { icon: Stethoscope, color: "text-blue-200", size: "w-40 h-40", top: "60%", left: "2%", delay: 0.2 },
  { icon: Users, color: "text-emerald-200", size: "w-28 h-28", top: "20%", right: "8%", delay: 0.4 },
  { icon: Syringe, color: "text-purple-200", size: "w-36 h-36", bottom: "15%", right: "5%", delay: 0.6 },
  { icon: Ambulance, color: "text-amber-200", size: "w-24 h-24", top: "45%", left: "85%", delay: 0.8 },
  { icon: Pill, color: "text-indigo-200", size: "w-20 h-20", top: "75%", left: "50%", delay: 1.0 },
  { icon: Microscope, color: "text-cyan-200", size: "w-28 h-28", top: "5%", left: "70%", delay: 1.2 },
  { icon: Activity, color: "text-teal-200", size: "w-20 h-20", bottom: "40%", left: "15%", delay: 1.4 },
];

export function RegisterClinicForm() {
  const owner = {
    email: "owner@gmail.com",
  };

  const notification = useNotificationStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ClinicSchema>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
      clinicType: undefined,
      phone: "",
      email: owner.email,
      logoUrl: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      website: "",
      gstNumber: "",
      openingTime: "",
      closingTime: "",
      workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  },
  });

  const [useOwnerEmail, setUseOwnerEmail] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const nameValue = watch("name");
  const emailValue = watch("email");
  const phoneValue = watch("phone")

  async function onSubmit(values: ClinicSchema) {
    try {

       let logoUrl: string | undefined;

      if(logoFile && logoFile.size > 0) {
        const upload = await uploadFile(logoFile, "clinicLogo")
        console.log("in register form logo url", upload.url)
        logoUrl = upload.url;
      }

      const response = await RegisterOwnerClinic({
        ...values,
        logoUrl,
      })
      
      if(response?.success) {

          notification.success(response?.message)

          setTimeout(() => {
            router.push("/owner/dashboard")
          }, 500);
      }

    } catch(error) {
      notification.error(
        error instanceof Error
        ? error.message
        : "Something went wrong"
      );
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        {clinicIcons.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.2,
                delay: item.delay,
                ease: "easeOut",
                y: {
                  duration: 4,
                  delay: item.delay,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }
              }}
              className="absolute"
              style={{
                top: item.top,
                left: item.left,
                right: item.right,
                bottom: item.bottom,
              }}
            >
              <Icon className={`${item.color} ${item.size}`} />
            </motion.div>
          );
        })}
      </div>

      <div className="relative w-full max-w-7xl">
        <div className="bg-transparent rounded-3xl shadow-2xl shadow-slate-200/60 border border-white/60 overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <div className="px-8 pt-8 pb-6">
              <div className="flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl shadow-blue-200/50">
                  <Store className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900">Register Your Clinic</h1>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Complete your clinic profile to start managing appointments
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-8">
            <div className="space-y-6">

                <div>
                    <LogoUploader
                        onUpload={(url) => {
                            setValue("logoUrl", url)
                        }}
                        onFileSelect={(file) => {
                            setLogoFile(file)
                        }}
                    />
                </div>

              <div className="bg-white/50 backdrop-blur-xs rounded-2xl p-6 border border-slate-200/50 hover:border-slate-200/80 transition-all">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
                    <Building2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-700">Basic Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Clinic Name <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="ABC Multispeciality Clinic"
                        className={`pl-9 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl ${
                          nameValue && !errors.name ? "border-green-400" : ""
                        }`}
                        {...register("name")}
                      />
                      {nameValue && !errors.name && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Clinic Type <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative mt-1.5">
                      <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <select
                        className="w-full h-12 pl-9 pr-3 rounded-xl border border-slate-200/70 bg-white/70 text-slate-700 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all appearance-none"
                        {...register("clinicType")}
                      >
                        <option value="">Select clinic type</option>
                        <option value="GENERAL">General</option>
                        <option value="DENTAL">Dental</option>
                        <option value="EYE">Eye</option>
                        <option value="ENT">ENT</option>
                        <option value="ORTHOPEDIC">Orthopedic</option>
                        <option value="PEDIATRIC">Pediatric</option>
                        <option value="PHYSIOTHERAPY">Physiotherapy</option>
                        <option value="SKIN">Skin</option>
                      </select>
                    </div>
                    {errors.clinicType && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        {errors.clinicType.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-xs rounded-2xl p-6 border border-slate-200/50 hover:border-slate-200/80 transition-all">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="p-2 rounded-xl bg-indigo-50 border border-indigo-100">
                    <Phone className="h-4 w-4 text-indigo-600" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-700">Contact Details</h2>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Label className="text-sm font-medium text-slate-700">
                        Clinic Phone <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="9876543210"
                        className={`pl-9 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl 
                        ${phoneValue && !errors.phone ? "border-green-400" : ""}`}
                        {...register("phone")}
                      />
                      {phoneValue && !errors.phone && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {errors.phone && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <Label className="text-sm font-medium text-slate-700">
                        Clinic Email
                      </Label>
                      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={useOwnerEmail}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setUseOwnerEmail(checked);
                            setValue("email", checked ? owner.email : "");
                          }}
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                        />
                        Use my login email
                      </label>
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        disabled={useOwnerEmail}
                        placeholder="clinic@email.com"
                        className={`pl-9 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl ${
                          useOwnerEmail ? "bg-slate-50/50" : ""
                        } ${emailValue && !errors.email ? "border-green-400" : ""}`}
                        {...register("email")}
                      />
                      {emailValue && !errors.email && (
                        <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-xs rounded-2xl p-6 border border-slate-200/50 hover:border-slate-200/80 transition-all">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
                    <MapPin className="h-4 w-4 text-emerald-600" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-700">Location</h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Address
                    </Label>
                    <div className="relative mt-1.5">
                      <Input
                        placeholder="123 Main Street, Area Name"
                        className="h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl pl-4"
                        {...register("address")}
                      />
                    </div>
                    {errors.address && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500" />
                        {errors.address.message}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        City <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        placeholder="Mumbai"
                        className="mt-1.5 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl"
                        {...register("city")}
                      />
                      {errors.city && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        State
                      </Label>
                      <Input
                        placeholder="Maharashtra"
                        className="mt-1.5 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl"
                        {...register("state")}
                      />
                      {errors.state && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.state.message}</p>
                      )}
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-slate-700">
                        Postal Code
                      </Label>
                      <Input
                        placeholder="400001"
                        className="mt-1.5 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl"
                        {...register("postalCode")}
                      />
                      {errors.postalCode && (
                        <p className="mt-1.5 text-xs text-red-500">{errors.postalCode.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-xs rounded-2xl p-6 border border-slate-200/50 hover:border-slate-200/80 transition-all">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="p-2 rounded-xl bg-purple-50 border border-purple-100">
                    <Globe className="h-4 w-4 text-purple-600" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-700">Additional Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Website
                    </Label>
                    <div className="relative mt-1.5">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        placeholder="www.clinic.com"
                        className="pl-9 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl"
                        {...register("website")}
                      />
                    </div>
                    {errors.website && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.website.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      GST Number
                    </Label>
                    <Input
                      placeholder="22ABCDE1234F1Z5"
                      className="mt-1.5 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl"
                      {...register("gstNumber")}
                    />
                    {errors.gstNumber && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.gstNumber.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-xs rounded-2xl p-6 border border-slate-200/50 hover:border-slate-200/80 transition-all">
                <div className="flex items-center gap-2.5 mb-5">
                  <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <h2 className="text-sm font-semibold text-slate-700">Operating Hours</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Opening Time
                    </Label>
                    <div className="relative mt-1.5">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="time"
                        className="pl-9 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl"
                        {...register("openingTime")}
                      />
                    </div>
                    {errors.openingTime && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.openingTime.message}</p>
                    )}
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-slate-700">
                      Closing Time
                    </Label>
                    <div className="relative mt-1.5">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        type="time"
                        className="pl-9 h-12 bg-white/70 border-slate-200/70 focus:border-blue-400 focus:ring-2 focus:ring-blue-100/50 transition-all rounded-xl"
                        {...register("closingTime")}
                      />
                    </div>
                    {errors.closingTime && (
                      <p className="mt-1.5 text-xs text-red-500">{errors.closingTime.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <Label className="text-sm font-medium text-slate-700">
                    Working Days
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                      (day) => (
                        <label
                          key={day}
                          className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200/70 bg-white/50 text-sm text-slate-700 cursor-pointer hover:bg-slate-50/70 transition-colors"
                        >
                          <input
                            type="checkbox"
                            value={day}
                            defaultChecked={day !== "Sunday"}
                            {...register("workingDays")}
                            className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-200"
                          />
                          {day.slice(0, 3)}
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className=" h-12 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-2xl shadow-xl shadow-blue-200/50 hover:shadow-2xl hover:shadow-blue-300/50 transition-all duration-300 text-base"
                >
                    {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Creating Clinic...
                    </>
                    ) : (
                    <>
                        Register Clinic
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                    )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}