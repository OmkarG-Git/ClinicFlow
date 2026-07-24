import { DataTableColumn } from "@/components/data-table";
import { Badge } from "@/components/ui/badge/Badge";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";
import { FormatDate } from "@/lib/DateFormater/FormatDate";
import { appointmentType } from "../types/AppointmentType";
import { AppointmentActions } from "../actions/AppointmentActions";

export const appointmentColumns: DataTableColumn<appointmentType>[] = [
  
  {
    id: "doctor",

    header: "DOCTOR",

    cell: (appointment) => (
      <div className="flex items-center gap-2">

        <div className="flex gap-1 items-center">
          <p className="flex items-center justify-center rounded-full bg-linear-to-br text-muted font-semibold h-8 w-8 common-bg">
            <span>
                {appointment.doctorFirstName?.charAt(0)}{appointment.doctorLastName?.charAt(0)}
            </span>
          </p>
          <div className="font-medium">
            <p className=" text-muted-forground"> 
              <Stethoscope size={11} />
            </p>
            <p>
              Dr. {appointment.doctorFirstName} {appointment.doctorLastName}
            </p>
          </div>
        </div>
      </div>
    ),
  },

  {
    id: "patient",

    header: "PATIENT",

    cell: (appointment) => (
      <div className="flex gap-1 items-center ">
        <p className="flex items-center justify-center rounded-full bg-linear-to-br text-muted font-semibold h-8 w-8 common-bg">
          <span>
              {appointment.patientFirstName?.charAt(0)}{appointment.patientLastName?.charAt(0)}
          </span>
        </p>

        <p className="text-sm text-muted-foreground">
          {appointment.patientFirstName} {appointment.patientLastName}
        </p>
       </div>
      ),
  },


  {
    id: "schedule",

    header: "SCHEDULE",

    cell: (appointment) => (
      <div className="flex flex-col gap-1 text-sm">

        <div className="flex items-center gap-2">
          <Calendar size={14} />

          {FormatDate.shortDate(
            appointment.appointmentDate
          )}
        </div>

        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock size={14} />

          <p className="text-xs">
            {FormatDate.convertTo12HourFormat(
              appointment.appointmentStartTime
            )}
          </p>
            -
          <p className="text-xs">
            {FormatDate.convertTo12HourFormat(
              appointment.appointmentEndTime
            )}
          </p>

        </div>

      </div>
    ),
  },

  {
    id: "type",

    header: "TYPE",

    cell: (appointment) => (
      <Badge variant="secondary">
        {appointment.type}
      </Badge>
    ),
  },

  {
    id: "status",

    header: "STATUS",

    cell: (appointment) => {

      const variant =
        appointment.status === "SCHEDULED"
          ? "secondary"
          : appointment.status === "CHECKED_IN"
          ? "info"
          : appointment.status === "COMPLETED"
          ? "success"
          : appointment.status === "CANCELLED"
          ? "destructive"
          : "secondary";

      return (
        <Badge variant={variant}>
          {appointment.status}
        </Badge>
      );
    },
  },

  {
    id: "actions",

    header: "",

    cell: (appointment) => (
      <AppointmentActions
        appointment={appointment}
      />
    ),
  },

];