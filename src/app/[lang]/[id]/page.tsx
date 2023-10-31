import {
  CommentFormCard,
  CommentsCard,
  PostDescription,
} from "@/components/Post";
import ShareButtons from "@/components/Post/ShareButtons";
import { getPostById } from "@/lib/api/getPostById";
import { getPostsMeta } from "@/lib/api/getPostsMeta";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Locale, i18n } from "@/lib/i18n/i18n-config";
import { metadata } from "@/lib/metadata";
import { getDate } from "@/lib/utils/getDate";
import { markdownToHtml } from "@/lib/utils/markdownToHtml";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import readingTime from "reading-time";

type Props = {
  params: {
    lang: Locale;
    id?: string;
  };
};

export default async function Post({ params: { lang, id } }: Props) {
  if (!id) return notFound();

  const {
    post: { data: currentPost },
  } = await getPostById({ id, locale: lang });

  if (!currentPost) return notFound();

  const { image, name, content, publishedAt, categories, comments } =
    currentPost.attributes;

  const parsedContent = await markdownToHtml(content ?? "No content yet");
  const { minutes } = readingTime(content ?? "");
  const date = getDate(publishedAt);

  const {
    post: { commentFormCard, commentsCard },
    common: { minRead },
  } = await getDictionary(lang);

  return (
    <div className="max-w-[700px] mx-auto">
      <div className="mb-4">
        <PostDescription
          categories={categories}
          date={date}
          image={image}
          name={name}
          publishedAt={publishedAt}
          readingTime={`${Math.round(minutes)} ${minRead}`}
        />
      </div>
      <div className="mb-12">
        <ShareButtons />
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: parsedContent }}
        className="post-content mb-12"
      />
      <div className="mb-12">
        <CommentFormCard postId={id} dictionary={commentFormCard} />
      </div>
      <CommentsCard
        comments={comments.data}
        title={commentsCard.title}
        noCommentsMessage={commentsCard.noCommentsMessage}
      />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getPostsMeta();
  return posts.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params: { lang, id } }: Props) {
  if (!id) return notFound();

  const {
    post: { data: currentPost },
  } = await getPostById({ id, locale: lang });

  if (!currentPost?.attributes) return notFound();

  const { name, excerpt, categories, publishedAt, updatedAt, image } =
    currentPost.attributes;

  let languages: Record<string, string> = {};
  i18n.locales.forEach((locale) => {
    languages[locale] = `${metadata.siteUrl}${id}/${locale}`;
  });

  const keywords = categories.data.map((category) => category.attributes.slug);

  const ogImage = image.data[0]?.attributes?.url ?? metadata.socialBanner

  return {
    title: name,
    description: excerpt,
    keywords,
    alternates: {
      canonical: `${metadata.siteUrl}${id}`,
      languages,
    },
    openGraph: {
      title: name,
      description: excerpt,
      url: `${metadata.siteUrl}${id}`,
      siteName: metadata.title,
      locale: lang,
      type: "article",
      publishedTime: publishedAt,
      modifiedTime: updatedAt,
      images: [ogImage]
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: excerpt,
      images: [ogImage]
    }
  } as Metadata;
}
