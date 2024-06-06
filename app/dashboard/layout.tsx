import React from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { stripe } from "@/lib/stripe";

async function getUserDat({
  firstName,
  lastName,
  email,
  profileImage,
  id,
}: {
  email: string;
  profileImage: string | undefined | null;
  id: string;
  lastName: string | undefined | null;
  firstName: string | undefined | null;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      stripeCustomerId: true,
    },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        id: id,

        name: `${firstName ?? ""} ${lastName ?? ""}`,
        email: email,
      },
    });
  }

  if (!user?.stripeCustomerId) {
    const data = await stripe.customers.create({
      email: email,
      name: `${firstName ?? ""} ${lastName ?? ""}`,
    });
    await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        stripeCustomerId: data.id,
      },
    });
  }
}
async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { getUser } = getKindeServerSession();

  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  await getUserDat({
    firstName: user.given_name,
    lastName: user.family_name,
    email: user.email as string,
    profileImage: user.picture,
    id: user.id,
  });
  return (
    <main className="flex flex-col space-y-6 mt-[2rem]">
      <section className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden flex-col md:flex">
          <DashboardNavbar />
        </aside>
        <article className="">{children}</article>
      </section>
    </main>
  );
}

export default DashboardLayout;
