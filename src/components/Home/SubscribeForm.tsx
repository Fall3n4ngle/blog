"use client";

import { Input, Label } from "@/components/ui";
import { subscribe } from "@/lib/actions/subscribe";
import { useRef } from "react";
import { FormButton, SuccessMessage, ErrorMessage } from "@/components/common";
import { useToast } from "@/lib/hooks/useToast";

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
    const { success, error } = await subscribe(formData);

    if (success) {
      toast({
        description: <SuccessMessage message={successMessage} />,
      });

      formRef.current?.reset();
      return;
    }

    toast({
      description: <ErrorMessage message={error ?? "An error occurred"} />,
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
      <FormButton>{buttonLabel}</FormButton>
    </form>
  );
}
