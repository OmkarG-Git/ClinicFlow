interface Props {
  columnCount: number;
}

export function DataTableLoading({
  columnCount,
}: Props) {

  return (
    <tbody>

      {Array.from({ length: 8 }).map((_, row) => (

        <tr key={row} className="border-b border-border">

          {Array.from({ length: columnCount }).map((_, col) => (

            <td
              key={col}
              className="px-6 py-5"
            >
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
            </td>

          ))}

        </tr>

      ))}

    </tbody>
  );

}