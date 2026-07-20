interface Props {
  columnCount: number;
  message: string;
}

export function DataTableEmpty({
  columnCount,
  message,
}: Props) {

  return (

    <tbody>

      <tr>

        <td
          colSpan={columnCount}
          className="py-16 text-center text-muted-foreground"
        >
          {message}
        </td>

      </tr>

    </tbody>

  );

}