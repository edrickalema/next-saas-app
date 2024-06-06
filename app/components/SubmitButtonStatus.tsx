"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButtonStatus = () => {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button disabled className="w-fit">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting
        </Button>
      ) : (
        <Button className="w-fit">Submit</Button>
      )}
    </>
  );
};

export default SubmitButtonStatus;
