import { Button } from "@/components/ui";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center pt-[13%]">
      <h2 className="font-title scroll-m-20 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
        404 Not found
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6 mb-4">
        The post you are requesting does not exist
      </p>
      <Link href="/">
        <Button variant="link">Go Home</Button>
      </Link>
    </div>
  );
}
