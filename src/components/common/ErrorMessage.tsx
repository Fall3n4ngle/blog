import { XCircle } from "lucide-react";

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
        <XCircle className="h-5 w-5 text-[#f8f8f7]" />
      </div>
      {message}
    </div>
  );
}
