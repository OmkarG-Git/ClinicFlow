"use client"

import { DataTableToolbar } from "@/components/data-table";
import { DataTable } from "@/components/data-table";
import { FilterByRole } from "../../inputs/FilterByRole";
import { usePatients } from "@/components/hooks/usePatient";
import { PatientColumn } from "../TableFeature/columns/PatientsColumn";
import { PatientActions } from "../../quickActions/PatientPageAction";

export function PatientTable() {

    const {
        data,
        loading,
        filters,
        setFilters,
        pagination
    } = usePatients();

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
                // rightContent={
                //     <FilterByRole
                //         onFilterChange={(role) => {
                //             const normalizedRole =
                //                 role === "doctor"
                //                     ? "DOCTOR"
                //                     : role === "receptionist"
                //                     ? "RECEPTIONIST"
                //                     : role === "admin"
                //                     ? "OWNER"
                //                     : undefined;

                //                 setFilters((prev) => ({
                //                 ...prev,
                //                 role: normalizedRole,
                //                 page: 1,
                //                 }));
                //         }}
                //     />
                // }
            />

            <DataTable
                columns={PatientColumn}
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
                    <PatientActions className="flex items-center justify-center"  />
                }
                emptyMessage="Your clinic has no staff members. Add your first team member."
            />
        </div>
    );
}