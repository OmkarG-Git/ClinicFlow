"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card/Card";
import { Logo } from "@/components/branding/Logo";
import { Shield, Sparkles } from "lucide-react";

interface LoginCardProps {
  children: ReactNode;
}

export function LoginCard({ children }: LoginCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full"
    >
      <Card 
        variant="elevated"
        className="relative bg-background overflow-hidden border-0 shadow-2xl shadow-primary/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-primary/10 to-transparent rounded-full blur-3xl" />
        
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
          </span>
          <span className="text-[10px] font-medium text-primary">Secure</span>
        </div>

        <CardHeader className="space-y-4 text-center pb-4 pt-10">
          

          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
              Welcome Back
            </h1>

            <p className="text-sm text-muted-foreground">
              Sign in to continue to{" "}
              <span className="text-primary font-semibold">ClinicFlow</span>
            </p>
          </div>

          <div className="relative pt-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/40"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-card px-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/60 flex items-center gap-1.5">
                <Shield className="w-3 h-3" />
                Secure Access
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="z-10 pt-2 px-8 pb-8">
          {children}
        </CardContent>

        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
      </Card>
    </motion.div>
  );
}