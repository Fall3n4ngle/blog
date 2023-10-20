import { Locale } from "@/lib/i18n/i18n-config";
import LocaleSwitcher from "./LocaleSwitcher";
import Logo from "./Logo";
import ModeToggle from "./ModeToggle";
import { getDictionary } from "@/lib/i18n/getDictionary";

type Props = {
  lang: Locale;
};

export default async function Header({ lang }: Props) {
  const {
    header: { modeToggle },
  } = await getDictionary(lang);

  return (
    <header className="py-4 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2.5">
          <LocaleSwitcher />
          <ModeToggle dictionary={modeToggle} />
        </div>
      </div>
    </header>
  );
}

