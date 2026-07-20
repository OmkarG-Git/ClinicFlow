"use client"

import { DataTableToolbar } from "@/components/data-table";
import { DataTable } from "@/components/data-table";
import { staffColumns } from "./columns/StaffColumn";
import { useStaff } from "@/components/hooks/useStaff";

export function StaffTable() {

    const {
        data,
        loading,
        filters,
        setFilters,
        pagination
    } = useStaff();

    return (
        <>
            <DataTableToolbar
                search={filters.search}
                onSearch={(search) => {
                    setFilters((prev => ({
                        ...prev,
                        search,
                        page: 1,
                    })))
                }}
                // rightContent={
                //     <CreateStaffButton />
                // }
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
                emptyMessage="No staff found."
            />
        </>
    );
}