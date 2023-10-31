"use client";

import { Button, Sheet, SheetContent, SheetTrigger } from "@/components/ui";
import { Menu } from "lucide-react";
import Navigation from "./Navigation";
import { Locale } from "@/lib/i18n/i18n-config";

type Props = {
  dictionary: Record<
    string,
    {
      label: string;
      href: string;
    }
  >;
  lang: Locale;
};

export default function SidebarNavigation({ dictionary, lang }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <Menu className="w-[1.2rem] h-[1.2rem]" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full min-[400px]:w-3/4">
        <Navigation
          dictionary={dictionary}
          lang={lang}
          orientation="vertical"
        />
      </SheetContent>
    </Sheet>
  );
}
