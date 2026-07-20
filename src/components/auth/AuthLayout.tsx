"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  CalendarCheck2,
  Activity,
  Sparkles,
  Users,
  Stethoscope,
  ArrowRight,
  Lock,
  CheckCircle2,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Logo } from "@/components/branding/Logo";

interface AuthLayoutProps {
  children: ReactNode;
}

const FEATURES = [
  {
    icon: CalendarCheck2,
    title: "Smart Scheduling",
    description: "AI-powered appointment management with real-time availability.",
    gradient: "from-blue-500 to-cyan-500",
    stat: "92% faster",
    color: "blue",
  },
  {
    icon: Users,
    title: "Patient Management",
    description: "Comprehensive patient records with instant access and analytics.",
    gradient: "from-purple-500 to-pink-500",
    stat: "50k+ records",
    color: "purple",
  },
  {
    icon: Stethoscope,
    title: "Clinical Workflows",
    description: "Streamlined clinical processes with automated documentation.",
    gradient: "from-emerald-500 to-teal-500",
    stat: "24/7 access",
    color: "emerald",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    description: "HIPAA compliant with end-to-end encryption and audit trails.",
    gradient: "from-orange-500 to-red-500",
    stat: "256-bit SSL",
    color: "orange",
  },
];

const STATS = [
  { label: "Active Users", value: "10,000+", icon: Users },
  { label: "Avg. Response", value: "< 2s", icon: Clock },
  { label: "Uptime", value: "99.99%", icon: Activity },
];

const TESTIMONIALS = [
  {
    quote: "Revolutionized our practice management",
    author: "Dr. Sarah Chen",
    role: "Medical Director",
    rating: 5,
  },
  {
    quote: "Exceptional patient engagement tools",
    author: "Dr. Michael Torres",
    role: "Chief of Surgery",
    rating: 5,
  },
];

export function AuthLayout({ children }: AuthLayoutProps) {
  // Animation variants for performance optimization
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3, ease: "easeOut" },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-[#1a1a2e] to-[#16213e] px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto w-full">
        <div className="relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden">
          {/* Background Effects - Optimized with CSS instead of animations */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.08),transparent_60%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px]" />
            

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.08),transparent_60%)]" />
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-2xl" />
            <div className="absolute bottom-20 left-20 w-60 h-60 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl" />

            {/* Static gradient orbs - no animation for performance */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 md:p-10 lg:p-14">
            {/* Header */}
            <div className="flex items-center justify-between mb-10">
              <Logo width={120} height={34} variant="dark" />
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-medium text-white/60">Operational</span>
              </div>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Left Column - Brand Content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-medium tracking-wider text-white/70">
                    NEXT-GEN HEALTHCARE PLATFORM
                  </span>
                </div>

                {/* Headline */}
                <div className="space-y-3">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-white">
                    Transform Your
                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                      Clinic Operations
                    </span>
                  </h1>
                  <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-lg">
                    Intelligent healthcare management platform that streamlines workflows,
                    enhances patient care, and accelerates practice growth.
                  </p>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex -space-x-2">
                    {["JD", "MS", "RT", "AL"].map((initials, i) => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-full border-2 border-white/10 bg-white/5 flex items-center justify-center text-xs font-medium text-white/60"
                      >
                        {initials}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">10,000+ professionals</p>
                    <p className="text-xs text-white/40">trust our platform</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {FEATURES.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={feature.title}
                        className="group relative p-3 rounded-xl bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] transition-colors duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-1.5 rounded-lg bg-gradient-to-br ${feature.gradient} shadow-lg shadow-black/20`}
                          >
                            <Icon className="h-3.5 w-3.5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm text-white truncate">
                              {feature.title}
                            </h3>
                            <p className="text-xs text-white/40">{feature.stat}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Testimonials */}
                <div className="flex flex-wrap items-center gap-6 pt-2">
                  {TESTIMONIALS.map((testimonial, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center">
                        <span className="text-xs font-medium text-white/60">
                          {testimonial.author.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs text-white/70">"{testimonial.quote}"</p>
                        <p className="text-[10px] text-white/40">{testimonial.author}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Auth Form */}
              <div className="lg:col-span-2">
                <div className="relative bg-white/[0.06] backdrop-blur-sm rounded-xl border border-white/10 border-t-0 p-6 md:p-8 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-xl" />
                  
                  {/* Mobile Logo */}
                  <div className="flex items-center justify-center lg:hidden mb-6">
                    <Logo width={100} height={28} variant="light" />
                  </div>

                  {children}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-10 pt-6 border-t border-white/5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  {STATS.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-white/30" />
                        <div>
                          <span className="text-sm font-semibold text-white/70">
                            {stat.value}
                          </span>
                          <span className="text-[10px] text-white/30 ml-1">
                            {stat.label}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] text-white/40">HIPAA Compliant</span>
                  </div>
                  <div className="w-px h-4 bg-white/10" />
                  <Lock className="w-3 h-3 text-white/30" />
                  <span className="text-[10px] text-white/30">256-bit SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}