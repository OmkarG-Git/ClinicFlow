import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status:
    | "Waiting"
    | "Consulting"
    | "Completed"
    | "Cancelled"
    | "Appointment"
    | "Walk-in"
    | "Active"
    | "Inactive";
}

const variants = {
  Waiting: "bg-amber-100 text-amber-700 border-amber-200",
  Consulting: "bg-blue-100 text-blue-700 border-blue-200",
  Completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Cancelled: "bg-red-100 text-red-700 border-red-200",

  Appointment: "bg-violet-100 text-violet-700 border-violet-200",
  "Walk-in": "bg-cyan-100 text-cyan-700 border-cyan-200",

  Active: "bg-green-100 text-green-700 border-green-200",
  Inactive: "bg-gray-100 text-gray-700 border-gray-200",
};

interface Props extends StatusBadgeProps {
  className?: string;
}

export function StatusBadge({
  status,
  className,
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        variants[status],
        className
      )}
    >
      {status}
    </span>
  );
}