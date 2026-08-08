"use client";

import { motion } from "framer-motion";
import { 
  CalendarDays, 
  Sparkles, 
  Activity,
  Users,
  Stethoscope,
  ArrowRight,
  Bell,
  Building2,
  UserPlus,
  CalendarPlus,
  ReceiptText,
  Cloud,
  CalendarCheck2,
  DollarSign,
} from "lucide-react";
import { useWorkspace } from "@/providers/WorkspaceProvider";
import { useEffect, useState } from "react";
import { type UserValidationSchemaType } from "@/lib/validations/owner/addUser.validation";

import { Button } from "@/components/ui/button/Button";

import Image from "next/image"

import { RecepstionistAndDoctoreCreatingForm } from "../form/CommonUserCreatingForm";
import { QuickActions,  QuickAction } from "../quickActions/QuickActions";
import { PatientForm } from "../form/PatientsForm";
import { AppointmentForm } from "../form/AppointmentForm";
import { useAction } from "@/components/actions/useAction";
import { ACTIONS } from "@/constants/actions";
import { ro } from "zod/v4/locales";
import { QUICK_ACTIONS } from "@/constants/quick-actions";
import { useClinicConfigurationStore } from "@/store/clinic-configuration-store";
import { can } from "@/lib/utils/FilteredAction";

interface DashboardHeroProps {
  ownerName?: string;
  clinicName?: string;
}

type UserRole = UserValidationSchemaType["role"];

export function DashboardHero({
  ownerName = "Dr. John",
  clinicName = "Aurora Dental Group · Downtown Branch",
}: DashboardHeroProps = {}) {
  const currentUser = useWorkspace();
  const [now, setNow] = useState<Date>(() => new Date());

  const { openAction } = useAction();


   const { layout, permissionMap } =
    useClinicConfigurationStore();

  const visibleQuickActions = 
    QUICK_ACTIONS.filter((item) => {
      const layoutEnabled =
        layout?.quickActions?.[item.id]?.enabled;

        const hasPermission = 
          can(
            currentUser.role,
            permissionMap,
            item.resource,
            item.permission
          );

        return layoutEnabled && hasPermission;
    })


// const quickActions: QuickAction[] = [
//     { 
//         icon: UserPlus, 
//         label: "Add Patient",
//         handler: () => openAction(ACTIONS.CREATE_PATIENT, {
//             title: "Add Patient",
//             description: "Create a new patient profile for your clinic.",
//         })
//     },
//     { 
//         icon: Stethoscope, 
//         label: "Add Doctor", 
//         handler: () => openAction(ACTIONS.CREATE_DOCTOR, {
//             title: "Add Doctor",
//             description: "Create a new doctor account for your clinic.",
//             role: "DOCTOR",
//         })
//     },
//     { 
//         icon: CalendarPlus, 
//         label: "Add Appointment",
//         handler: () => openAction(ACTIONS.CREATE_APPOINTMENT, {
//             title: "Add Appointment",
//             description: "Schedule a new appointment for your clinic.",
//         })
//     },
//     { 
//         icon: ReceiptText, 
//         label: "Create Invoice",
//         handler: () => console.log("Create invoice")
//     },
// ];

  
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now.toLocaleDateString(undefined, { 
    weekday: "long", 
    month: "long", 
    day: "numeric" 
  });
  const timeStr = now.toLocaleTimeString([], { 
    hour: "2-digit", 
    minute: "2-digit" 
  });
  
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <>

      <section className="col-span-12 relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 via-emerald-900/30 to-teal-900/20 shadow-2xl">
        <div 
          aria-hidden 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative grid grid-cols-12 gap-6 p-8">
          {/* Left: greeting */}
          <div className="col-span-12 lg:col-span-6 flex min-w-0 flex-col justify-between">
            <div>
              <div className="mb-4 flex items-center gap-2">
                {currentUser.clinic?.logoUrl ? (
                  <div className="relative grid h-11 w-12"> 
                    <Image 
                    src={currentUser.clinic.logoUrl}
                    fill
                    alt="ClinicFlow"
                    priority
                    className="object-cover z-10 rounded-xl h-full w-full"
                  />
                  </div>
                ) : (
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-400 shadow-lg shadow-emerald-500/25">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                )}
                <div className="min-w-0">
                  <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/60">
                    {currentUser?.clinic?.name || clinicName}
                  </div>
                  <div className="font-mono text-[11px] text-white/50">
                    {dateStr} · {timeStr}
                  </div>
                </div>
              </div>
              <h1 className="text-[34px] font-semibold leading-[1.05] tracking-tight text-white">
                {greeting}, <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">{currentUser?.firstName || ownerName}</span>
              </h1>
              <p className="mt-2 max-w-lg text-[13.5px] text-white/60">
                You have <span className="font-semibold text-white">24 appointments</span> today, 3 need
                confirmation, and 2 lab reports are ready to review.
              </p>
            </div>

            {/* Quick actions */}
            <div>
              <QuickActions className="mt-6 flex flex-wrap gap-2" actions={visibleQuickActions} />
            </div>
          </div>

          {/* Right: today summary + weather */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-2 gap-3">
            <SummaryTile icon={Users} label="Patients Today" value="48" delta="+12%" />
            <SummaryTile icon={CalendarCheck2} label="Appointments" value="24" delta="+4" />
            <SummaryTile icon={DollarSign} label="Revenue Today" value="$8,420" delta="+18%" accent />
            <WeatherTile />
          </div>
        </div>
        
        {/* <RecepstionistAndDoctoreCreatingForm
            open={openAddNewUserForm.status}
            onClose={() => setAddNewUserForm({
              status: false,
              title: "",
              descrition: "",
              role: undefined,
            })}
            title={openAddNewUserForm.title}
            description={openAddNewUserForm.descrition}
            role={openAddNewUserForm.role}
            ClinicId={currentUser.clinicId}
        />

        <PatientForm 
          open={openPatientForm.status}
          onClose={() => setOpenPatientForm({
            title: "",
            description: "",
            status: false,
            ClinicId: null,
          })}
          title={openPatientForm.title}
          description={openPatientForm.description}
          clinicId={openPatientForm.ClinicId}
        />

        <AppointmentForm
          open={openAppointmentForm.status}
          onClose={() => setOpenAppointmentForm({
            title: "",
            description: "",
            status: false,
          })}
          title={openAppointmentForm.title}
          description={openAppointmentForm.description}
        /> */}

      </section>
    </>
  );
}

function SummaryTile({
  icon: Icon, 
  label, 
  value, 
  delta, 
  accent,
}: { 
  icon: React.ComponentType<{ className?: string }>; 
  label: string; 
  value: string; 
  delta: string; 
  accent?: boolean;
}) {
  return (
    <div className={
      "relative overflow-hidden rounded-4xl border p-4 backdrop-blur " +
      (accent 
        ? "bg-gradient-to-br from-cyan-500 to-purple-500 border-transparent text-black" 
        : "border-white/10 bg-slate-800/20 text-white")
    }>
      <div className="flex items-center justify-between">
        <span className={"text-[11px] font-medium uppercase tracking-wider " + (accent ? "text-black" : "text-white/60")}>
          {label}
        </span>
        <Icon className={"h-4 w-4 " + (accent ? "text-black" : "text-white/60")} />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <span className="text-2xl font-semibold tracking-tight">{value}</span>
        <span className={
          "rounded-md px-1.5 py-0.5 text-[10.5px] font-semibold " +
          (accent 
            ? "bg-white/15 text-black" 
            : "bg-emerald-500/20 text-emerald-400")
        }>{delta}</span>
      </div>
    </div>
  );
}

function WeatherTile() {
  return (
    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-4 backdrop-blur text-white">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-white/60">Weather</span>
        <Cloud className="h-4 w-4 text-cyan-400" />
      </div>
      <div className="mt-3 flex items-end justify-between">
        <div>
          <div className="text-2xl font-semibold tracking-tight">72°F</div>
          <div className="text-[11px] text-white/50">Partly cloudy · SF</div>
        </div>
        <div className="text-right text-[10.5px] text-white/50">
          <div>H 78° L 61°</div>
          <div>Humidity 54%</div>
        </div>
      </div>
    </div>
  );
}