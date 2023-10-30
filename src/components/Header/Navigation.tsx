"use client";

import { cn } from "@/lib/utils/cn";
import { isActiveLink } from "@/lib/utils/isActiveLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "../ui";

type Props = {
  dictionary: Record<
    string,
    {
      label: string;
      href: string;
    }
  >;
  orientation: "horizontal" | "vertical";
};

export default function Navigation({ dictionary, orientation }: Props) {
  const pathname = usePathname();

  return (
    <nav className={cn(orientation === "vertical" && "h-full")}>
      <ul
        className={cn(
          "flex items-center gap-4 text-muted-foreground ",
          orientation === "vertical"
            ? "flex-col justify-center h-full"
            : "flex-row"
        )}
      >
        {Object.keys(dictionary).map((item) => {
          const { href, label } = dictionary[item];
          const active = isActiveLink(href, pathname);

          return (
            <li
              key={href}
              className={cn(
                "hover:text-foreground transition-all px-3 py-2 cursor-pointer text-sm",
                active && "text-foreground bg-secondary rounded-sm"
              )}
            >
              {orientation === "horizontal" ? (
                <Link href={href}>{label}</Link>
              ) : (
                <SheetClose asChild>
                  <Link href={href}>{label}</Link>
                </SheetClose>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
