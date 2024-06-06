"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import { NavItems } from "./DashboardNavbar";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { LogOut } from "lucide-react";

const UseNav = ({
  name,
  email,
  picture,
}: {
  name: string;
  email: string;
  picture: string;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-10 w-10 rounded-full bg-transparent">
          <Avatar>
            <AvatarImage
              className="h-10 w-10 rounded-full"
              src={picture ? picture : "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount className="w-56">
        <DropdownMenuLabel>
          <div>
            <p className="text-sm leading-none font-medium">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          {NavItems.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link className="w-full flex justify-between" href={link.href}>
                  {link.name}

                  <span>
                    <link.icon className="h-4 w-4" />
                  </span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className="w-full justify-between items-center"
        >
          <LogoutLink>Logout</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UseNav;
