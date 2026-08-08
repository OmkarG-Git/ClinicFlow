"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button/Button";
import { PermissionSection } from "./PermissionSection";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Stethoscope, 
  Shield, 
  Sparkles, 
  Save, 
  Loader2,
  CheckCircle2,
  AlertCircle,
  Lock,
  Unlock
} from "lucide-react";
import { useNotificationStore } from "@/store/notification-store";
import { getErrorMessage, isNetworkError } from "@/lib/utils/error-handler";
import { getRolePermissionsAction, updateRolePermissionsAction } from "@/actions/settings/actions";
import { Permission } from "@/types/permission";

interface Props {
    role: "DOCTOR" | "RECEPTIONIST";
    permissions: Permission[] | undefined | null;
}

const roleOptions = [
    { 
        value: "DOCTOR" as const, 
        label: "Doctor", 
        icon: Stethoscope,
        description: "Medical professionals"
    },
    { 
        value: "RECEPTIONIST" as const, 
        label: "Receptionist", 
        icon: Users,
        description: "Front desk staff"
    },
];

export function PermissionSettingsPage({
    role,
    permissions,
}: Props) {
    const [selectedRole, setSelectedRole] = useState(role);
    const [data, setData] = useState(permissions || []);
    const [fixedData, setFixedData] = useState(permissions || []);
    const [isSaving, setIsSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const notification = useNotificationStore();

    const handleRoleChange = async (role: "DOCTOR" | "RECEPTIONIST") => {
        if (!role || role === selectedRole) return;
        
        try {
            setSelectedRole(role);
            setLoading(true);
            setHasChanges(false);

            const result = await getRolePermissionsAction(role);

            if (!result.data) {
                throw new Error("Something went wrong when fetching data");
            }

            setData(result.data);
            setFixedData(result.data);
        } catch(error) {
            const message = getErrorMessage(error);
            notification.error(message);
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    }

    const handlePermissionChange = (newData: Permission[]) => {
        const hasChanged = JSON.stringify(newData) !== JSON.stringify(fixedData);
        setHasChanges(hasChanged);
        setData(newData);
    }

    async function handleSave() {
        setIsSaving(true);
        try {
            const result = await updateRolePermissionsAction(
                selectedRole,
                data
            );

            if (result.success) {
                notification.success("Permission Updated successfully");
                setFixedData(data);
                setHasChanges(false);
            }
        } catch (error) {
            if (isNetworkError(error)) {
                notification.error("Network error. Please check your connection.");
                console.error("Network error:", error);
                return;
            }

            const message = getErrorMessage(error);
            notification.error(message);
            console.error("Error:", error);
        } finally {
            setIsSaving(false);
        }
    }

    // Handle no permissions state
    if (!permissions || permissions.length === 0) {
        return (
            <div className="space-y-6">
                {/* Header Section */}
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex gap-2 flex-wrap">
                        {roleOptions.map((option) => {
                            const isActive = selectedRole === option.value;
                            const Icon = option.icon;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleRoleChange(option.value)}
                                    disabled={loading}
                                    className={cn(
                                        "group flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
                                            : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white",
                                        loading && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    <Icon className={cn(
                                        "h-5 w-5 transition-colors",
                                        isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                                    )} />
                                    <div className="flex flex-col items-start">
                                        <span>{option.label}</span>
                                        <span className="text-[10px] opacity-60">
                                            {option.description}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* No Permissions State */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-12 text-center">
                    <div className="mb-4 rounded-full bg-emerald-500/10 p-4">
                        <Lock className="h-8 w-8 text-emerald-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">No Permissions Configured</h3>
                    <p className="mt-2 max-w-md text-sm text-white/40">
                        Permissions for <span className="text-white/60 capitalize">{selectedRole.toLowerCase()}s</span> haven't been set up yet.
                        Configure permissions to control what this role can access.
                    </p>
                    <Button
                        onClick={() => {
                            // You can add logic to initialize default permissions here
                            notification.info("Configure permissions by toggling switches below");
                        }}
                        className="mt-6 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
                    >
                        <Unlock className="mr-2 h-4 w-4" />
                        Configure Permissions
                    </Button>
                </div>
            </div>
        );
    }

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-emerald-400" />
                    <p className="text-sm text-white/40">Loading permissions...</p>
                </div>
            </div>
        );
    }

    const totalPermissions = data.length;
    const grantedPermissions = data.filter(p => p.allowed).length;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-2 flex-wrap">
                    {roleOptions.map((option) => {
                        const isActive = selectedRole === option.value;
                        const Icon = option.icon;

                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleRoleChange(option.value)}
                                disabled={loading}
                                className={cn(
                                    "group flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-medium transition-all duration-200",
                                    isActive
                                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
                                        : "border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white",
                                    loading && "opacity-50 cursor-not-allowed"
                                )}
                            >
                                <Icon className={cn(
                                    "h-5 w-5 transition-colors",
                                    isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                                )} />
                                <div className="flex flex-col items-start">
                                    <span>{option.label}</span>
                                    <span className="text-[10px] opacity-60">
                                        {option.description}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                        <Shield className="h-4 w-4 text-emerald-400" />
                        <div>
                            <p className="text-xs text-white/40">Current Role</p>
                            <p className="text-sm font-medium text-white capitalize">
                                {selectedRole.toLowerCase()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                        <div>
                            <p className="text-xs text-white/40">Granted Permissions</p>
                            <p className="text-sm font-medium text-white">
                                {grantedPermissions} of {totalPermissions}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                    <div className="flex items-center gap-3">
                        <div className={cn(
                            "h-2 w-2 rounded-full",
                            hasChanges ? "bg-emerald-400 animate-pulse" : "bg-white/20"
                        )} />
                        <div>
                            <p className="text-xs text-white/40">Status</p>
                            <p className="text-sm font-medium text-white">
                                {hasChanges ? "Unsaved changes" : "All saved"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Permission Sections */}
            <div className="space-y-4">
                {Array.from(new Set(data.map(p => p.resource))).map(resource => (
                    <PermissionSection
                        key={resource}
                        resource={resource}
                        permissions={data.filter(p => p.resource === resource)}
                        onChange={handlePermissionChange}
                        allPermissions={data}
                    />
                ))}
            </div>

            {/* Footer with Save */}
            <div className={cn(
                "sticky bottom-0 -mx-6 px-6 py-4 transition-all duration-300",
                hasChanges 
                    ? "bg-gradient-to-t from-slate-900 via-slate-900/95 to-transparent border-t border-white/10" 
                    : "bg-transparent"
            )}>
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Changes apply immediately for all users with this role</span>
                    </div>
                    
                    <Button
                        onClick={handleSave}
                        disabled={isSaving || !hasChanges}
                        className={cn(
                            "min-w-[140px] transition-all",
                            hasChanges
                                ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30"
                                : "bg-white/5 text-white/40 border border-white/10"
                        )}
                    >
                        {isSaving ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                            </>
                        ) : hasChanges ? (
                            <>
                                <Save className="mr-2 h-4 w-4" />
                                Save Changes
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                All Saved
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}