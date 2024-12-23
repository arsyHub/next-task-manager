import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[white] w-full h-14 shadow-sm fixed z-50">
      <div className="flex justify-between items-center h-full px-4 md:px-10">
        <div>
          <h1 className="font-bold">Hi, User 👋</h1>
          <p className="text-xs text-slate-500">Have a nice day</p>
        </div>
        <div className="flex items-center gap-4">
          <span>
            <Bell />
          </span>
          <Avatar>
            <AvatarImage src="https://ui.shadcn.com/avatars/02.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
