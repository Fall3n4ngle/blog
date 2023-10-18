"use client";

import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
} from "@/components/ui";
import { i18n } from "@/lib/i18n/i18n-config";
import Link from "next/link";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const currentLang = pathName.split("/")[1];

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          {currentLang}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent >
        {i18n.locales.map((locale) => (
          <Link href={redirectedPathName(locale)} key={locale}>
            <DropdownMenuItem>{locale}</DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
