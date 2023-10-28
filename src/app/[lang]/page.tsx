import {
  AuthorCard,
  Filter,
  Pagination,
  PostCard,
  Search,
  Sort,
  SubscribeCard,
} from "@/components/Home";
import { getPosts } from "@/lib/api/getPosts";
import { getHomePageData } from "@/lib/api/gethomePageData";
import { Locale, i18n } from "@/lib/i18n/i18n-config";
import { formatCategory } from "@/lib/utils/formatCategory";
import { Metadata } from "next";
import readingTime from "reading-time";

type Props = {
  searchParams: {
    sort?: SortBy;
    name?: string;
    category?: string;
    page?: string;
  };
  params: {
    lang: Locale;
  };
};

const pageSize = 5;

export default async function Home({
  searchParams: { sort, name, category, page },
  params: { lang },
}: Props) {
  const categoryFilter = category ? formatCategory(category) : "";

  const {
    posts,
    meta: {
      pagination: { pageCount },
    },
  } = await getPosts({
    sort,
    name,
    category: categoryFilter,
    page,
    pageSize,
    locale: lang,
  });

  const { author, categories } = await getHomePageData();

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <Search />
        <Sort />
      </div>
      <div className="mb-6">
        <Filter categories={categories} />
      </div>
      <div className="grid grid-cols-7 gap-4 mb-6">
        <div className="col-span-7 lg:col-span-5 flex flex-col gap-6">
          {posts.map((post) => {
            const { text } = readingTime(post.attributes.content ?? "");

            return (
              <PostCard
                key={post.id}
                attributes={post.attributes}
                readingTime={text}
                id={post.id}
              />
            );
          })}
        </div>
        <div className="col-span-2 hidden lg:flex flex-col gap-6">
          <AuthorCard attributes={author.attributes} />
          <SubscribeCard />
        </div>
      </div>
      {pageCount > 1 ? <Pagination totalPages={pageCount} /> : null}
    </>
  );
}