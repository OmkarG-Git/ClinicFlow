// RoleLayoutsPage.tsx
"use client";

import { PageContainer } from "../../common/layout/PageContainer";
import { PageHeader } from "../../common/layout/PageHeader";
import { 
  LayoutDashboard, 
  Menu, 
  Zap, 
  ChevronRight,
  Sparkles,
  Users,
  Calendar,
  Settings,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";
import Navigator from "@/components/common/navigation/Navigator";
import { NavigationKey } from "@/constants/navigations";

const layoutOptions = [
  {
    id: "sidebarPermission" as NavigationKey ,
    title: "Sidebar",
    description: "Control which sidebar items are visible for each role",
    icon: Menu,
    href: "/owner/settings/role-layout/sidebar",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    textColor: "text-purple-400",
  },
  {
    id: "dashboardPermission" as NavigationKey,
    title: "Dashboard",
    description: "Configure dashboard widgets and their visibility",
    icon: LayoutDashboard,
    href: "/owner/settings/role-layout/dashboard",
    color: "from-emerald-500 to-cyan-500",
    bgColor: "bg-emerald-500/10",
    textColor: "text-emerald-400",
  },
  {
    id: "quickActionsPermission" as NavigationKey,
    title: "Quick Actions",
    description: "Manage quick action buttons available on dashboard",
    icon: Zap,
    href: "/owner/settings/role-layout/quick-actions",
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-400",
  },
];

export function RoleLayoutsPage() {
  return (
    <PageContainer>
      <div className="flex items-start justify-between">
        <PageHeader
          title="Role Layouts"
          subtitle="Control what each role can access in the system."
        />
      </div>

      <div className="mt-8 grid gap-4">
        {/* Info Banner */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4 mb-2">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-emerald-400 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-400">Role-Based Layout Management</p>
              <p className="text-sm text-white/40">
                Configure what each role can see and access. Changes apply immediately for all users with that role.
              </p>
            </div>
          </div>
        </div>

        {/* Layout Cards */}
        {layoutOptions.map((option, index) => {
          const Icon = option.icon;

          return (
            <Navigator
              key={index}
              id={option.id}
            >
              <div className={cn(
                "group relative flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-xl hover:shadow-emerald-500/5 cursor-pointer"
              )}>
                {/* Left Section */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Icon */}
                  <div className={cn(
                    "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-all duration-300 group-hover:scale-110",
                    option.bgColor
                  )}>
                    <Icon className={cn("h-5 w-5", option.textColor)} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-white group-hover:text-white/90 transition-colors">
                      {option.title}
                    </h3>
                    <p className="mt-0.5 text-sm text-white/40 group-hover:text-white/60 transition-colors">
                      {option.description}
                    </p>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  {/* Status Badge */}
                  <span className="hidden sm:inline-block rounded-full bg-white/5 px-3 py-1 text-xs text-white/30">
                    Configure
                  </span>
                  
                  {/* Arrow */}
                  <div className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-white/20 transition-all duration-300 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 group-hover:translate-x-1">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>

                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
              </div>
            </Navigator>
          );
        })}

        {/* Footer Note */}
        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3">
          <div className="flex items-center gap-2 text-xs text-white/30">
            <Shield className="h-3.5 w-3.5" />
            <span>All changes are role-specific and affect all users with that role</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/60 animate-pulse" />
            <span className="text-[10px] text-white/20">Live</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}