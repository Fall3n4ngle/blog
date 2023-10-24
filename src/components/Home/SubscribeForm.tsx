"use client";

import { Input, Label } from "@/components/ui";
import { subscribe } from "@/lib/actions/subscribe";
import { useRef } from "react";
import SubscribeFormButton from "./SubscribeFormButton";
import { useToast } from "@/lib/hooks/useToast";
import { Check } from "lucide-react";

export default function SubscribeForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      await subscribe(formData);

      toast({
        description: (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Check className="h-5 w-5 text-[#f8f8f7]" />
            </div>
            You subscribed successfully!
          </div>
        ),
      });
    } catch (error: any) {
      toast({
        description: error?.message ?? "An error occurred",
        variant: "destructive",
      });
    } finally {
      formRef.current?.reset();
    }
  };

  return (
    <form action={handleSubmit} ref={formRef} className="flex flex-col gap-3">
      <Label htmlFor="email">Your email</Label>
      <Input
        placeholder="example@gmail.com"
        type="email"
        id="email"
        name="email"
        required
      />
      <SubscribeFormButton />
    </form>
  );
}
