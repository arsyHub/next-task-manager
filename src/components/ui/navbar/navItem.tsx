"use client";

import Link from "next/link";
import * as React from "react";

interface NavItemProps {
  label?: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

export const NavItem: React.FC<NavItemProps> = ({
  label,
  href,
  icon,
  active,
  onClick,
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="flex flex-col items-center cursor-pointer"
  >
    <span
      className={`${
        active ? "bg-white text-black" : "bg-black text-white"
      } rounded-full p-2`}
    >
      {icon}
    </span>
    <span>{label}</span>
  </Link>
);
