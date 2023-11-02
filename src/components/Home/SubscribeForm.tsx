"use client";

import { Input, Label } from "@/components/ui";
import { subscribe } from "@/lib/actions/subscribe";
import { useRef } from "react";
import SubscribeFormButton from "../FormButton";
import { useToast } from "@/lib/hooks/useToast";
import { Check } from "lucide-react";

type Props = {
  dictionary: {
    label: string;
    successMessage: string;
    buttonLabel: string;
  };
};

export default function SubscribeForm({
  dictionary: { label, successMessage, buttonLabel },
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    const result = await subscribe(formData);

    if (result.success) {
      toast({
        description: (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Check className="h-5 w-5 text-[#f8f8f7]" />
            </div>
            {successMessage}
          </div>
        ),
      });

      formRef.current?.reset();
      return;
    }

    toast({
      description: result.error,
      variant: "destructive",
    });
  };

  return (
    <form action={handleSubmit} ref={formRef} className="flex flex-col gap-3">
      <Label htmlFor="email">{label}</Label>
      <Input
        placeholder="example@gmail.com"
        type="email"
        id="email"
        name="email"
        required
      />
      <SubscribeFormButton>{buttonLabel}</SubscribeFormButton>
    </form>
  );
}
