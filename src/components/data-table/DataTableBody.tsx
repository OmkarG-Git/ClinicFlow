import { DataTableColumn } from "./types";

interface Props<T> {

    columns: DataTableColumn<T>[];

    data: T[];

}

export function DataTableBody<T>({
    columns,
    data,
}: Props<T>) {

    return (

        <tbody>

            {data.map((row, index) => (

                <tr
                    key={index}
                    className=" border-b border-border last:border-none hover:bg-muted/40"
                >

                    {columns.map(column => (

                        <td
                            key={column.id}
                            className="px-6 py-4"
                        >
                            {column.cell(row)}
                        </td>

                    ))}

                </tr>

            ))}

        </tbody>

    );

}