import { Locale } from "@/lib/i18n/i18n-config";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import { getDictionary } from "@/lib/i18n/getDictionary";
import Navigation from "./Navigation";
import SidebarNavigation from "./SidebarNavigation";

type Props = {
  lang: Locale;
};

export default async function Header({ lang }: Props) {
  const {
    header: { modeToggle, navigation },
  } = await getDictionary(lang);

  return (
    <header className="py-4 sticky top-0 z-50 bg-background">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="hidden sm:block">
          <Navigation dictionary={navigation} orientation="horizontal" />
        </div>
        <div className="flex items-center gap-2.5">
          <div className="sm:hidden">
            <SidebarNavigation dictionary={navigation} />
          </div>
          <LocaleSwitcher />
          <ModeToggle dictionary={modeToggle} />
        </div>
      </div>
    </header>
  );
}
