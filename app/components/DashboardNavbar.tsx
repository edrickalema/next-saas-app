"use client";

import { cn } from "@/lib/utils";
import { CreditCard, HomeIcon, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import React from "react";

export const NavItems = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Billings", href: "/dashboard/billings", icon: CreditCard },
];
const DashboardNavbar = () => {
  const pathname = usePathname();
  return (
    <nav className="grid items-start gap-2">
      {NavItems.map((link, index) => {
        return (
          <Link href={link.href} key={link.name}>
            <span
              className={cn(
                "group flex rounded-md items-center font-medium px-3 py-2 hover:text-accent-foreground hover:bg-accent",
                pathname === link.href ? "bg-accent" : "bg-transparent"
              )}
            >
              <link.icon className="h-4 w-4 mr-2 text-primary" />
              <span>{link.name}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
};

export default DashboardNavbar;
