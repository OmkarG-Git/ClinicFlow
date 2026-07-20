import {
  DataTableProps,
} from "./types";

import { DataTableHead } from "./DataTableHead";
import { DataTableBody } from "./DataTableBody";
import { DataTableLoading } from "./DataTableLoading";
import { DataTableEmpty } from "./DataTableEmpty";
import { DataTablePagination } from "./DataTablePagination";

export function DataTable<T>({
  columns,
  data,
  loading = false,
  emptyMessage = "No data found.",
  pagination,
  onPageChange,
}: DataTableProps<T>) {

  return (
    <div className="overflow-hidden rounded-[40px]  bg-card">

      <div className="overflow-x-auto">

        <table className="w-full">

          <DataTableHead
            columns={columns}
          />

          {loading ? (
            <DataTableLoading
              columnCount={columns.length}
            />
          ) : data.length === 0 ? (
            <DataTableEmpty
              columnCount={columns.length}
              message={emptyMessage}
            />
          ) : (
            <DataTableBody
              columns={columns}
              data={data}
            />
          )}

        </table>

      </div>

      {pagination && (
        <DataTablePagination
          pagination={pagination}
          onPageChange={onPageChange}
        />
      )}

    </div>
  );
}