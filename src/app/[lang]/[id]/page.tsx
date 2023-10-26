import {
  CommentFormCard,
  CommentsCard,
  PostDescription,
} from "@/components/Post";
import { getPostById } from "@/lib/api/getPostById";
import { getPostsMeta } from "@/lib/api/getPostsMeta";
import { Locale } from "@/lib/i18n/i18n-config";
import { getDate } from "@/lib/utils/getDate";
import { markdownToHtml } from "@/lib/utils/markdownToHtml";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import readingTime from "reading-time";

type Props = {
  params: {
    lang?: Locale;
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
        className="post-content mb-12"
      />
      <div className="mb-12">
        <CommentFormCard postId={id} />
      </div>
      <CommentsCard comments={comments.data} />
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getPostsMeta();
  return posts.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params: { id, lang } }: Props) {
  if (!id) {
    return {
      title: "Not found",
      description: "A post with id was not found",
    };
  }

  const {
    post: { data },
  } = await getPostById({ id, locale: lang });

  if (!data) {
    return {
      title: "Not found",
      description: "A post with id was not found",
    };
  }

  const {
    attributes: { name, excerpt },
  } = data;

  return {
    title: name,
    description: excerpt,
  } as Metadata;
}
