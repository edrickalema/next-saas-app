import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import UseNav from "./UseNav";

async function Navbar() {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <nav className="items-center bg-background h-[10vh] border-b flex">
      <div className="container justify-between items-center flex">
        <Link href="/">
          <h1 className="font-bold text-3xl">
            <span className="text-primary">Note</span>dly
          </h1>
        </Link>

        <div className="flex items-center gap-x-5">
          <ThemeToggle />

          {(await isAuthenticated()) ? (
            <UseNav
              name={user?.family_name as string}
              email={user?.email as string}
              picture={user?.picture as string}
            />
          ) : (
            <div className="flex items-center gap-x-5">
              <RegisterLink>
                <Button>Sign Up</Button>
              </RegisterLink>

              <LoginLink>
                <Button variant={"secondary"}>Sign In</Button>
              </LoginLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
