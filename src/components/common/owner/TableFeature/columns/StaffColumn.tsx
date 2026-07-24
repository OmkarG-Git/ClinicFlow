// features/staff/columns.tsx

import { DataTableColumn } from "@/components/data-table";
import { Staff } from "../types/StaffType";
import { Badge } from "@/components/ui/badge/Badge";
import { StaffActions } from "../actions/StaffActions";
import Image from "next/image";
import { Mail, Phone, Calendar } from "lucide-react";
import { FormatDate } from "@/lib/DateFormater/FormatDate";

export const staffColumns: DataTableColumn<Staff>[] = [

  {
    id: "name",

    header: "STAFF",

    cell: (staff) => (
      <div className="flex gap-2 items-center ">
        <div className="flex items-center justify-center rounded-full bg-linear-to-br text-muted font-semibold h-8 w-8 common-bg">
            {staff?.avatarUrl ? (
                <div className="h-full w-full ">
                    <Image 
                        src={staff.avatarUrl}
                        fill
                        className="object-cover "
                        alt={`${staff.firstName.charAt(0)}${staff.lastName.charAt(0)}`}
                    />
                </div>
            ) : (
                <span>
                    {staff.firstName.charAt(0)}{staff.lastName.charAt(0)}
                </span>
            )}
        </div>
        <div>
            <p className="font-medium">
                {staff.firstName} {staff.lastName}
                </p>

                <p className="text-xs text-muted-foreground">
                    {staff.email}
                </p>
        </div>
      </div>
    ),
  },

  {
    id: "phone",

    header: "CONTACT",

    cell: (staff) => (
        <div className="flex flex-col text-xs text-left gap-2">
            <div className="flex items-center gap-2">
                <Mail size={10} className="" />
                {staff.email}
            </div>
             {staff.phone && (
                <div className="flex items-center gap-2">
                    <Phone size={10} className="" />
                    {staff.phone}
                </div>
             )}
        </div>
    ),
  },

  {
    id: "role",

    header: "ROLE",

    cell: (staff) => (
      <Badge>
        {staff.role}
      </Badge>
    ),
  },

  {
    id: "status",

    header: "STATUS",

    cell: (staff) => (
      <Badge variant={staff.isActive ? "success" : "destructive"}>
        {staff.isActive ? "Active" : "Inactive"}
      </Badge>
    ),
  },

  {
    id: "created_at",

    header: "JOINED AT",

    cell: (staff) => (
      <div className="flex items-center text-sm gap-2">
        <Calendar size={14} />
        {staff.createdAt && FormatDate.shortDate(staff.createdAt) }
      </div>
    ),
  },

  {
    id: "actions",

    header: "",

    cell: (staff) => (
      <StaffActions staff={staff} />
    ),
  },
];