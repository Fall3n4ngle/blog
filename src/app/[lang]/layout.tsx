import { League_Spartan, Libre_Baskerville } from "next/font/google";
import Providers from "@/providers";
import { PropsWithChildren } from "react";
import Header from "@/components/Header";
import { Locale, i18n } from "@/lib/i18n/i18n-config";
import { Metadata } from "next";
import { metadata } from "@/lib/metadata";

import "../globals.css";

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
      lang={lang}
      className={`${leagueSpartan.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header lang={lang} />
            <main className="grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export function generateMetadata({ params: { lang } }: Props) {
  let languages: Record<string, string> = {};
  i18n.locales.forEach((locale) => {
    languages[locale] = `${metadata.siteUrl}${locale}`;
  });

  return {
    metadataBase: metadata.siteUrl,
    title: {
      template: `%s | ${metadata.title}`,
      default: metadata.title,
    },
    description: metadata.description,
    keywords: metadata.keywords,
    alternates: {
      canonical: metadata.siteUrl,
      languages,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      url: metadata.siteUrl,
      siteName: metadata.title,
      images: [metadata.socialBanner],
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [metadata.socialBanner],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  } as Metadata;
}
