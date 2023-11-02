import AboutHeading from "@/components/About/AboutHeading";
import { getAuthor } from "@/lib/api/getAuthor";
import { Locale } from "@/lib/i18n/i18n-config";
import { markdownToHtml } from "@/lib/utils/markdownToHtml";
import { Metadata } from "next";

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function About({ params: { lang } }: Props) {
  const {
    attributes: { about, ...props },
  } = await getAuthor(lang);

  const parsedAbout = await markdownToHtml(about ?? "No content yet");

  return (
    <div className="secondary-container">
      <div className="mb-6 sm:mb-12">
        <AboutHeading {...props} />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: parsedAbout }}
        className="markdown"
      />
    </div>
  );
}

export const metadata: Metadata = {
  title: "About",
  description: "This page contains information about author of the blog",
};
