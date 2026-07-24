interface Props {
  columnCount: number;
  message: string;
  action: React.ReactNode;
}

export function DataTableEmpty({
  columnCount,
  message,
  action
}: Props) {

  return (

    <tbody>

      <tr>

        <td
          colSpan={columnCount}
          className="py-16 text-center text-muted-foreground"
        >
          <div className="flex flex-col gap-2">
            <p>{message}</p>
            {action && (
              <div>
                {action}
              </div>
            )}
          </div>
        </td>

      </tr>


    </tbody>

  );

}