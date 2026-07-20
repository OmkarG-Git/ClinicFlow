"use client";

import { useState } from "react";
import { Eye, EyeOff, LoaderCircle, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { FormField } from "@/components/shared/FormField";

import { useRouter } from "next/navigation"

import {
  loginSchema,
  LoginSchema,
} from "@/lib/validations/auth";

import { useNotificationStore } from "@/store/notification-store";
import { loginAction } from "@/actions/auth/login";

export function LoginForm() {
  const notification = useNotificationStore();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState<"email" | "password" | null>(null);


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    try {
      const result = await loginAction(values);

      switch (result.role) {
        case "SUPER_ADMIN":
          router.push("/super-admin/dashboard");
          break;

        case "OWNER":
          router.push(
            result.clinicId
              ? "/owner/dashboard"
              : "/register-clinic"
          );
          break;

        case "DOCTOR":
          router.push("/doctor/dashboard");
          break;

        case "RECEPTIONIST":
          router.push("/reception/dashboard");
          break;
      }

      
    } catch (error) {
      notification.error(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField
        id="email"
        label="Email Address"
        required
        error={errors.email?.message}
      >
        <div className="relative">
          <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
            isFocused === "email" ? "text-primary" : "text-muted-foreground/60"
          }`} />
          <Input
            id="email"
            type="email"
            placeholder="doctor@clinic.com"
            autoComplete="email"
            className="pl-10 transition-all duration-200"
            onFocus={() => setIsFocused("email")}
            {...register("email")}
          />
        </div>
      </FormField>

      <FormField
        id="password"
        label="Password"
        required
        error={errors.password?.message}
      >
        <div className="relative">
          <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-200 ${
            isFocused === "password" ? "text-primary" : "text-muted-foreground/60"
          }`} />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            className="pl-10 pr-12 transition-all duration-200 focus:shadow-lg focus:shadow-primary/5"
            onFocus={() => setIsFocused("password")}
            
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors duration-200 hover:bg-secondary/80"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </FormField>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 focus:ring-2 transition-colors duration-200"
          />
          <label
            htmlFor="remember"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer select-none"
          >
            Remember me
          </label>
        </div>
        
        <Button
          type="button"
          variant="link"
          className="h-auto p-0 text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
        >
          Forgot Password?
        </Button>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold hover:from-primary/90 hover:to-primary shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </Button>
      </motion.div>

    </form>
  );
}