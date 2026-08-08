"use client";

import { useState, useTransition, useEffect } from 'react';
import { PageContainer } from '../../../common/layout/PageContainer';
import { PageHeader } from '../../../common/layout/PageHeader';
import { RoleLayout } from '@/db/schema';
import { RoleSelector } from '../RoleSelector';
import { getRoleOptionLayoutAction, updateRoleLayoutAction } from '@/actions/settings/get-role-layout-action';
import { cn } from '@/lib/utils';
import { SettingsSaveBar } from '../SettingsSaveBar';
import { useNotificationStore } from '@/store/notification-store';
import { setLayout } from 'recharts/types/state/layoutSlice';
import { SectionContainer } from '../SectionContainer';
import { DASHBOARD_METADATA } from '@/constants/metadata/layout-metadata';

interface Props {
    initialRole: "DOCTOR" | "RECEPTIONIST";
    initialLayout: any;
    initialSidebarLayout?: any;
}

export function RoleLayoutDashboardPage({
    initialRole,
    initialLayout,
    initialSidebarLayout
}: Props) {
    const [dashboardLayout, setDashboardLayout] = useState(initialLayout);
    const [sidebarLayout, setSidebarLayout] = useState(initialSidebarLayout)
    const [initialLayoutState, setInitialLayoutState] = useState(initialLayout)
    const [role, setRole] = useState(initialRole);
    const [hasChanges, setHasChanges] = useState(false);
    const [isPending, startTransition] = useTransition();
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const notification = useNotificationStore();

    useEffect(() => {
        if(dashboardLayout && initialLayoutState) {
            const hasChanged = JSON.stringify(dashboardLayout) !== JSON.stringify(initialLayoutState);
            setHasChanges(hasChanged)
        }
    }, [dashboardLayout, initialLayoutState])


    const handleCancel = () => {
        setDashboardLayout(initialLayoutState);
        setHasChanges(false);
    }

    async function handleRoleChange(role: "DOCTOR" | "RECEPTIONIST") {
        setRole(role);
        setHasChanges(false);
        setIsLoading(true);

        startTransition(async () => {
            try {
                const response = await getRoleOptionLayoutAction(role, "dashboard");
                if (response.success) {
                    setDashboardLayout(response.data.layout);
                    setInitialLayoutState(response.data.layout);
                    setSidebarLayout(response.data.sidebar);
                }
            } catch (error) {
                console.error('Error fetching layout:', error);
            } finally {
                setIsLoading(false);
            }
        });
    }

    
 async function saveChanges() {
    setIsSaving(true);

    try {
       const result = await updateRoleLayoutAction(
            role,
            "dashboard",
            dashboardLayout
        );

        if(result.success) {
            notification.success("layout updated successfully");
            setDashboardLayout(result.data?.sidebar)
            setInitialLayoutState(result.data?.sidebar);
        }
        

        setHasChanges(false);
    } finally {
        setIsSaving(false);
    }
    }

    return (
        <PageContainer>
            <PageHeader 
                title="Sidebar Layout" 
                subtitle={`Configure sidebar visibility for ${role.toLowerCase()}s.`}
            />

            <div className="relative">
                {/* Loading overlay */}
                {isLoading && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center   rounded-2xl">
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-10 w-10 animate-spin rounded-full border-3 border-white/20 border-t-emerald-400" />
                            <p className="text-sm text-white/50 animate-pulse">Loading layout...</p>
                        </div>
                    </div>
                )}

                <div className={cn(
                    "transition-opacity duration-300",
                    isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
                )}>
                    <div className="mt-2">
                        <RoleSelector 
                            value={role}
                            onChange={handleRoleChange}
                            disabled={isLoading}
                        />
                    </div>
                    
                    <div className="mt-6">
                        <SectionContainer
                            section={'dashboard'}
                            title='Dashboard Widgets'
                            description='Choose which widgets appear on dashboard.' 
                            layout={dashboardLayout}
                            sidebarLayout={sidebarLayout}
                            setLayout={setDashboardLayout}
                            isLoading={isLoading}
                            metadata={DASHBOARD_METADATA}
                        />
                    </div>
                    <SettingsSaveBar 
                        hasChanges={hasChanges}
                        isSaving={isSaving}
                        onSave={saveChanges}
                        onReset={handleCancel}
                    />
                </div>
            </div>

        </PageContainer>
    );
}