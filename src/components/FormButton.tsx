import { Button, ButtonProps } from "@/components/ui";
import { Loader2 } from "lucide-react";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function FormButton(props: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button className="self-start" {...props}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit
    </Button>
  );
}