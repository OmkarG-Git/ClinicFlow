"use client";

import { DataTableToolbar } from "@/components/data-table";
import { DataTable } from "@/components/data-table";
import { useAppointment } from "@/components/hooks/useAppointment";
import { appointmentColumns } from "../TableFeature/columns/AppointmetColumn";
import { AppointmentActions } from "../../quickActions/AppointmentPageAction";
import { FilterBtns } from "../../inputs/FilterBtns";
import { AppointmentStatus } from "@/db/schema";
import { AppointmentStates } from "../pageState/AppointmentStates";

export function AppointmentTable() {
    
  const appointmentButtons = [
    { title: "Scheduled", action: "SCHEDULED" as AppointmentStatus },
    { title: "Checked In", action: "CHECKED_IN" as AppointmentStatus },
    { title: "In Progress", action: "IN_PROGRESS" as AppointmentStatus },
    { title: "Completed", action: "COMPLETED" as AppointmentStatus },
    { title: "Cancelled", action: "CANCELLED" as AppointmentStatus },
  ] as const;

  const { data, loading, filters, setFilters, pagination } = useAppointment();

  return (
    <div className="flex flex-col gap-3 mt-5">
      <DataTableToolbar
        search={filters.search}
        onSearch={(search) => {
          setFilters((prev) => ({
            ...prev,
            search,
            page: 1,
          }));
        }}
        rightContent={
          <FilterBtns<AppointmentStatus>
            className="..."
            buttons={appointmentButtons}
            onFilterChange={(status) => {
              setFilters((prev) => ({ ...prev, status, page: 1 }));
            }}
          />
        }
      />

      <DataTable
        columns={appointmentColumns}
        data={data}
        loading={loading}
        pagination={pagination}
        onPageChange={(page) =>
          setFilters((prev) => ({
            ...prev,
            page,
          }))
        }
        action={
          <AppointmentActions className="flex items-center justify-center gap-3" />
        }
        emptyMessage="There is not any appointment create"
      />
    </div>
  );
}
