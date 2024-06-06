import SubmitButtonStatus from "@/app/components/SubmitButtonStatus";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import React from "react";

const getUserData = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      colorTheme: true,
    },
  });

  return data;
};
const SettingsPage = async () => {
  // Getting user from kinde database
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const data = await getUserData(user?.id as string);

  async function postData(fromData: FormData) {
    "use server";
    const name = fromData.get("name");
    const color = fromData.get("color");

    await prisma.user.update({
      where: {
        id: user?.id as string,
      },
      data: {
        name: name as string,
        colorTheme: color as string,
      },
    });

    revalidatePath("/", "layout");
  }
  return (
    <main className="grid items-start gap-6">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-1xl">Account Settings</h1>
          <p className="text-lg text-muted-foreground">Your Profile Settings</p>
        </div>
      </div>

      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>
              Please provide a general information, and save it
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your Name</Label>
                <Input
                  name="name"
                  defaultValue={data?.name as string}
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-1">
                <Label>Email Address</Label>
                <Input
                  name="email"
                  type="email"
                  disabled
                  placeholder="Your email address"
                  defaultValue={data?.email as string}
                />
              </div>
              <div className="space-y-1">
                <Label>Color Schema</Label>
                <Select name="color" defaultValue={data?.colorTheme as string}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color"></SelectValue>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Color</SelectLabel>
                        <SelectItem value="theme-green">Green</SelectItem>
                        <SelectItem value="theme-blue">Blue</SelectItem>
                        <SelectItem value="theme-rose">Rose</SelectItem>
                        <SelectItem value="theme-yellow">Yellow</SelectItem>
                        <SelectItem value="theme-red">Red</SelectItem>
                        <SelectItem value="theme-violet">Violet</SelectItem>
                        <SelectItem value="theme-orange">Orange</SelectItem>
                        <SelectItem value="theme-zinc">Zinc</SelectItem>
                        <SelectItem value="theme-stone">Stone</SelectItem>
                        <SelectItem value="theme-gray">Gray</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButtonStatus />
          </CardFooter>
        </form>
      </Card>
    </main>
  );
};

export default SettingsPage;
