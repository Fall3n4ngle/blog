"use client";

import { Input, Label, Textarea } from "@/components/ui";
import { useRef } from "react";
import FormButton from "./FormButton";
import { useToast } from "@/lib/hooks/useToast";
import SuccessMessage from "./SuccessMessage";

type Props = {
  action: (data: FormData) => Promise<ServerActionReturnType>;
  dictionary: {
    comment: {
      label: string;
      placeholder: string;
    };
    name: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    successMessage: string;
    errorMessage: string;
    buttonLabel: string;
  };
};

export default function FeedbackForm({
  action,
  dictionary: {
    comment: commentDictionary,
    email,
    errorMessage,
    name,
    successMessage,
    buttonLabel,
  },
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: FormData) => {
    const result = await action(data);

    if (result.success) {
      toast({
        description: <SuccessMessage message={successMessage}/>
      });

      formRef.current?.reset();
      return;
    }

    toast({
      title: errorMessage,
      description: result.error,
    });
  };

  return (
    <form ref={formRef} action={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="comment" className="mb-2 block">
          {commentDictionary.label}
        </Label>
        <Textarea
          id="comment"
          placeholder={commentDictionary.placeholder}
          name="content"
          required
          rows={10}
        />
      </div>
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-4 mb-6">
        <div className="basis-full sm:basis1/2">
          <Label htmlFor="name" className="mb-2 block">
            {name.label}
          </Label>
          <Input
            id="name"
            name="name"
            placeholder={name.placeholder}
            required
            className="block"
          />
        </div>
        <div className="basis-full sm:basis1/2">
          <Label htmlFor="email" className="mb-2 block">
            {email.label}
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder={email.placeholder}
            required
            className="block"
          />
        </div>
      </div>
      <FormButton>{buttonLabel}</FormButton>
    </form>
  );
}
