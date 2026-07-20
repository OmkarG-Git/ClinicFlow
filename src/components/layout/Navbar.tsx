"use client";

import { UserMenu } from "./UserMenu";
import { PanelLeft, Search } from "lucide-react";
import { useSidebar } from "./SidebarProvider";
import { Button } from "../ui/button/Button";
import { Input } from "../ui/input/Input";
import { CurrentUser } from "@/types/current-userType";

interface NavbarProps {
  title: string;
  user: CurrentUser
}

export function Navbar({ title, user }: NavbarProps) {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between border-b border-slate-700/80 bg-navbar z-20 backdrop-blur-lg px-6 flex-shrink-0">
      <div className="flex items-center gap-4">
        <Button
          size="icon"
          variant="ghost"
          onClick={toggleSidebar}
          className="hover:bg-slate-100"
        >
          <PanelLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibol">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 " />
          <Input
            placeholder="Search..."
            className="w-64 pl-9 h-9 bg-input border-slate-200/60 focus:bg-white focus:border-blue-400 rounded-lg text-sm"
          />
        </div>

        <UserMenu name="Super Admin" role="Administrator" />
      </div>
    </header>
  );
}