"use client";

import { NavItem } from "./navItem";
import { House, Inbox, Layers2, Users } from "lucide-react";
import * as React from "react";
import Cookies from "js-cookie";

export default function Navbar() {
  const [activeItem, setActiveItem] = React.useState("home");

  React.useEffect(() => {
    const savedActiveItem = Cookies.get("activeItem") || "home";
    setActiveItem(savedActiveItem);
  }, []);

  const onNavItemClick = (item: string): void => {
    Cookies.set("activeItem", item, { expires: 7 }); // Set cookie dengan durasi 7 hari
    setActiveItem(item);
  };

  return (
    <nav className="fixed bottom-0 w-full bg-black p-3 md:w-1/2 md:rounded-tr-full md:rounded-tl-full shadow-md">
      <div className="flex items-center justify-around space-x-4 text-[white]">
        <NavItem
          // label="Home"
          href="/"
          icon={<House />}
          active={activeItem === "home"}
          onClick={() => onNavItemClick("home")}
        />
        <NavItem
          // label="Projects"
          href="/projects"
          icon={<Inbox />}
          active={activeItem === "projects"}
          onClick={() => onNavItemClick("projects")}
        />
        <NavItem
          // label="Tasks"
          href="/tasks"
          icon={<Layers2 />}
          active={activeItem === "tasks"}
          onClick={() => onNavItemClick("tasks")}
        />
        <NavItem
          // label="Users"
          href="/users"
          icon={<Users />}
          active={activeItem === "users"}
          onClick={() => onNavItemClick("users")}
        />
      </div>
    </nav>
  );
}
