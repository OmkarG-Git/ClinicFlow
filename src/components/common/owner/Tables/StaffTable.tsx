"use client"

import { DataTableToolbar } from "@/components/data-table";
import { DataTable } from "@/components/data-table";
import { staffColumns } from "../TableFeature/columns/StaffColumn";
import { useStaff } from "@/components/hooks/useStaff";
import { StaffAction } from "../../quickActions/StaffPageActions";
import { UserRole } from "@/db/schema";
import { FilterBtns } from "../../inputs/FilterBtns";

export function StaffTable() {

    const StaffRoleButtons = [
         { title: "Doctors", action: "DOCTOR" as UserRole },
         { title: "Receptionists", action: "RECEPTIONIST" as UserRole },
         { title: "Admin", action: "OWNER" as UserRole },
    ]

    const {
        data,
        loading,
        filters,
        setFilters,
        pagination
    } = useStaff();

    return (
        <div className="flex flex-col gap-3 mt-5">
            <DataTableToolbar
                search={filters.search}
                onSearch={(search) => {
                    setFilters((prev => ({
                        ...prev,
                        search,
                        page: 1,
                    })))
                }}
                rightContent={
                    <FilterBtns<UserRole>
                        buttons={StaffRoleButtons}
                        onFilterChange={(role) => {
                            setFilters((prev) => ({
                                ...prev,
                                role: role,
                                page: 1
                            }))
                        }}
                    />
                }
            />

            <DataTable
                columns={staffColumns}
                data={data}
                loading={loading}
                pagination={pagination}
                onPageChange={(page) => 
                    setFilters(prev => ({
                        ...prev,
                        page,
                    }))
                }
                action={
                    <StaffAction className="flex items-center justify-center"  />
                }
                emptyMessage="Your clinic has no staff members. Add your first team member."
            />
        </div>
    );
}