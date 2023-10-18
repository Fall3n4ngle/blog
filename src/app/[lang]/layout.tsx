import { League_Spartan, Libre_Baskerville } from "next/font/google";
import Providers from "@/providers";
import { PropsWithChildren } from "react";

import "../globals.css";
import Header from "@/components/Header";
import { Locale } from "@/lib/i18n/i18n-config";

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--title-font",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--regular-font",
  display: "swap",
});

type Props = PropsWithChildren & {
  params: {
    lang: Locale;
  };
};

export default function RootLayout({ children, params: { lang } }: Props) {
  return (
    <html
      lang="en"
      className={`${leagueSpartan.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header lang={lang} />
            <main className="container grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
