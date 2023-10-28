"use client";

import { Input, Label, Textarea } from "@/components/ui";
import { useRef } from "react";
import FormButton from "@/components/FormButton";
import { useToast } from "@/lib/hooks/useToast";
import { comment } from "@/lib/actions/comment";

type Props = {
  postId: string;
};

export default function CommentFrom({ postId }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const handleSubmit = async (data: FormData) => {
    try {
      await comment(data, postId);

      toast({
        title: "Your comment was submitted",
        description: "It will appear when the author approves it",
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
    <form ref={formRef} action={handleSubmit}>
      <div className="mb-4">
        <Label htmlFor="comment" className="mb-2 block">
          Your comment
        </Label>
        <Textarea
          id="comment"
          placeholder="type your comment here..."
          name="content"
          required
          rows={10}
        />
      </div>
      <div className="flex items-center flex-wrap sm:flex-nowrap gap-4 mb-6">
        <div className="basis-full sm:basis1/2">
          <Label htmlFor="name" className="mb-2 block">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            required
            className="block"
          />
        </div>
        <div className="basis-full sm:basis1/2">
          <Label htmlFor="email" className="mb-2 block">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="example@gmail.com"
            required
            className="block"
          />
        </div>
      </div>
      <FormButton>Submit</FormButton>
    </form>
  );
}
