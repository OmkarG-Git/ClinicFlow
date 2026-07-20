import { DataTableColumn } from "./types";

interface Props<T> {
    columns: DataTableColumn<T>[];
}

export function DataTableHead<T>({
    columns,
}: Props<T>) {

    return (

        <thead className="border-b border-border ">

            <tr className="">

                {columns.map(column => (

                    <th
                        key={column.id}
                        className={`px-6 py-2 text-neutral-500 text-left text-xs font-semibold ${column.className ?? ""}`}
                    >
                        {column.header}
                    </th>

                ))}

            </tr>

        </thead>

    );

}