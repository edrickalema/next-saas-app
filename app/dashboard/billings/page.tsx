import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import React from "react";

const featureItems = [
  { name: "100GB of storage" },
  { name: "100GB of storage" },

  { name: "100GB of storage" },
  { name: "100GB of storage" },
];
const BillingsPage = () => {
  return (
    <main className="max-w-md mx-auto space-y-4">
      <Card className="flex flex-col">
        <CardContent className="py-8">
          <div>
            <h3 className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-primary/10 text-primary">
              Monthly
            </h3>
          </div>
          <div className="mt-4 flex items-baseline text-6xl font-extrabold">
            $5.5{" "}
            <span className="ml-1 text-2xl text-muted-foreground">/mo</span>
          </div>

          <p className="mt-5 text-lg text-muted-foreground">
            Cancel anytime. No commitments.
          </p>
        </CardContent>

        <div className="flex-1 flex flex-col justify-between px-6 py-6 bg-secondary rounded-lg space-y-6 sma:p-18 sm:pl-6">
          <ul className="space-y-6">
            {featureItems.map((item, index) => {
              return (
                <li key={index}>
                  <div className="flex">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />

                    <p className="ml-3 text-base">{item.name}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <form className="w-full">
            <Button className="w-full">Buy Today</Button>
          </form>
        </div>
      </Card>
    </main>
  );
};

export default BillingsPage;
