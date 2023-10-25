import { PostDescription } from "@/components/Post";
import { getPostBySlug } from "@/lib/api/getPostBySlug";
import { Locale } from "@/lib/i18n/i18n-config";
import { getDate } from "@/lib/utils/getDate";
import { markdownToHtml } from "@/lib/utils/markdownToHtml";
import { notFound } from "next/navigation";
import readingTime from "reading-time";

type Props = {
  params: {
    lang?: Locale;
    slug?: string;
  };
};

export default async function Post({ params: { lang, slug } }: Props) {
  const {
    post: { data },
  } = await getPostBySlug({ slug, locale: lang });

  if (!data) return notFound();

  const { image, name, content, publishedAt, categories } = data.attributes;

  const parsedContent = await markdownToHtml(content ?? "No content yet");
  const { text } = readingTime(content ?? "");
  const date = getDate(publishedAt);

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="mb-12">
        <PostDescription
          categories={categories}
          date={date}
          image={image}
          name={name}
          publishedAt={publishedAt}
          readingTime={text}
        />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: parsedContent }}
        className="post-content"
      />
    </div>
  );
}
