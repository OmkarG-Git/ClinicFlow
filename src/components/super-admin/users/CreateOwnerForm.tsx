"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, UserPlus, Mail, Lock, User, Shield, CheckCircle } from "lucide-react";

import { createOwnerAction } from "@/actions/super-admin/create-owner";

import {
  createOwnerSchema,
  type CreateOwnerSchema,
} from "@/lib/validations/owner.validation";

import { useNotificationStore } from "@/store/notification-store";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";

export function CreateOwnerForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const notification = useNotificationStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CreateOwnerSchema>({
    resolver: zodResolver(createOwnerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  const emailValue = watch("email");
  const firstNameValue = watch("firstName");
  const lastNameValue = watch("lastName");

  async function onSubmit(values: CreateOwnerSchema) {
    try {
        console.log(values);

        const response = await createOwnerAction(values)

        if(response.success) {
            notification.success(response.message)
        } 

    } catch (error) {
        notification.error(
            error instanceof Error
            ? error.message
            : "Something went wrong"
        )
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-muted text-muted-forground rounded-2xl  border border border-border overflow-hidden">
      <div className="px-8 pt-8 pb-6 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-muted border border-border">
            <UserPlus className="h-6 w-6 " />
          </div>
          <div>
            <h2 className="text-xl font-bold">Create Owner Account</h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Set up a new clinic owner with administrative access
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="px-8 py-6 space-y-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1.5">
              First Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Enter first name"
                className={`pl-9 h-11 bg-muted  border border-border focus:bg-white focus:border-blue-400 transition-colors ${
                  firstNameValue && !errors.firstName ? "border-green-400 " : ""
                }`}
                {...register("firstName")}
              />
              {firstNameValue && !errors.firstName && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
            </div>
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1.5">
              Last Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Enter last name"
                className={`pl-9 h-11 bg-muted border border-border focus:bg-white focus:border-blue-400 transition-colors ${
                  lastNameValue && !errors.lastName ? "border-green-400 " : ""
                }`}
                {...register("lastName")}
              />
              {lastNameValue && !errors.lastName && (
                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
              )}
            </div>
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium  mb-1.5">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="email"
              placeholder="john.doe@clinic.com"
              className={`pl-9 h-11 bg-muted border border-border focus:bg-white focus:border-blue-400 transition-colors ${
                emailValue && !errors.email ? "border-green-400 " : ""
              }`}
              {...register("email")}
            />
            {emailValue && !errors.email && (
              <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium  mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Min 6 characters"
                className="pl-9 pr-10 h-11 bg-muted border border-border focus:bg-white focus:border-blue-400 transition-colors"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {passwordValue && (
              <div className="mt-1.5 flex items-center gap-2">
                <div className="flex-1 flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 h-1 rounded-full transition-all ${
                        i <= Math.min(Math.floor(passwordValue.length / 3), 3)
                          ? passwordValue.length >= 8
                            ? "bg-green-500"
                            : passwordValue.length >= 6
                            ? "bg-yellow-500"
                            : "bg-red-500"
                          : "bg-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-medium text-slate-400">
                  {passwordValue.length < 6
                    ? `${passwordValue.length}/6`
                    : passwordValue.length >= 8
                    ? "Strong"
                    : "Medium"}
                </span>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium  mb-1.5">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className={`pl-9 pr-10 h-11 bg-muted border border-border focus:bg-white focus:border-blue-400 transition-colors ${
                  confirmPasswordValue &&
                  passwordValue &&
                  confirmPasswordValue === passwordValue &&
                  !errors.confirmPassword
                    ? "border-green-400 "
                    : ""
                }`}
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {confirmPasswordValue &&
              passwordValue &&
              confirmPasswordValue === passwordValue &&
              !errors.confirmPassword && (
                <p className="mt-1 text-xs text-green-600 flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  Passwords match
                </p>
              )}
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl  transition-all hover:shadow-blue-300/50"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Owner Account"
          )}
        </Button>

        <p className="text-center text-xs text-slate-400 pt-1">
          This account will have full administrative privileges
        </p>
      </form>
    </div>
  );
}