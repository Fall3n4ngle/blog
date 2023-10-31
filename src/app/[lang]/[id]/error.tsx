"use client"; 

import { Button } from "@/components/ui";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center text-center pt-[13%]">
      <h2 className="font-title scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
        Something went wrong
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4">
        An error occurred while requesting the post
      </p>
      <Button onClick={reset}>Retry</Button>
    </div>
  );
}
