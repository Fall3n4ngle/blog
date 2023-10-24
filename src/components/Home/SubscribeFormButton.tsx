import { Button } from "@/components/ui";
import { Loader2 } from "lucide-react";

// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubscribeFormButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="self-start">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit
    </Button>
  );
}
