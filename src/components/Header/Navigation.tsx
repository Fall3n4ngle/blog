"use client";

import { cn } from "@/lib/utils/cn";
import { isActiveLink } from "@/lib/utils/isActiveLink";
import { usePathname } from "next/navigation";
import { Locale } from "@/lib/i18n/i18n-config";
import { SheetClose } from "../ui";
import NavigationItem from "./NavigationItem";

type Props = {
  dictionary: Record<
    string,
    {
      label: string;
      href: string;
    }
  >;
  orientation: "horizontal" | "vertical";
  lang: Locale;
};

export default function Navigation({ dictionary, orientation, lang }: Props) {
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

          const link = `/${lang}/${href}`;

          return orientation === "horizontal" ? (
            <NavigationItem
              active={active}
              label={label}
              link={link}
              key={link}
            />
          ) : (
            <SheetClose asChild>
              <NavigationItem
                active={active}
                label={label}
                link={link}
                key={link}
              />
            </SheetClose>
          );
        })}
      </ul>
    </nav>
  );
}
