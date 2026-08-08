"use client";

import {
  MoreHorizontal,
  Eye,
  ShieldCheck,
  ShieldX,
} from "lucide-react";

import { Button } from "@/components/ui/button/Button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Staff } from "../types/StaffType";
import Navigator from "@/components/common/navigation/Navigator";

interface StaffActionsProps {
  staff: Staff;

  onView?: (staff: Staff) => void;

  onToggleStatus?: (staff: Staff) => void;
}

export function StaffActions({
  staff,
  onView,
  onToggleStatus,
}: StaffActionsProps) {
  const isActive = staff.isActive;

  return (
    <div className="relative ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-52 z-50">
          <DropdownMenuItem>
            <Navigator
                id="viewProfile"
                params={{staff: staff.id}}
                className="w-full"
            >
                <div className="w-full flex items-center">
                    <Eye className="mr-2 h-4 w-4" />
                    <p>View Profile</p>
                </div>
            </Navigator>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() =>
              onToggleStatus?.(staff)
            }
          >
            {isActive ? (
              <>
                <ShieldX className="mr-2 h-4 w-4 text-red-500" />
                Suspend
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-4 w-4 text-emerald-500" />
                Activate
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}