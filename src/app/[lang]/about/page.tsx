import ImageNotFound from "@/components/ImageNotFound";
import { getAuthor } from "@/lib/api/getAuthor";
import { Locale } from "@/lib/i18n/i18n-config";
import { markdownToHtml } from "@/lib/utils/markdownToHtml";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: {
    lang: Locale;
  };
};

export default async function About({ params: { lang } }: Props) {
  const {
    attributes: { bio, image, name, position, about },
  } = await getAuthor(lang);

  const parsedAbout = await markdownToHtml(about ?? "No content yet");

  return (
    <div className="secondary-container">
      <div className="relative pt-[55%] mb-7">
        {image.data?.attributes?.url ? (
          <Image
            src={process.env.CMS_URL + image.data.attributes.url}
            alt={name}
            fill
            className="rounded-md object-cover"
            priority
          />
        ) : (
          <ImageNotFound />
        )}
      </div>
      <h2 className="mb-4 scroll-m-20 text-3xl sm:text-4xl font-semibold tracking-tight font-title">
        {name}
      </h2>
      <p className="text-muted-foreground mb-4 text-sm sm:text-base">
        {position}
      </p>
      <p className="mb-6 sm:mb-12 text-sm sm:text-base sm:leading-7 border-b pb-4">{bio}</p>
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
