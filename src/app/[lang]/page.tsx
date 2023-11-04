import {
  AuthorCard,
  Filter,
  Pagination,
  PostCard,
  Search,
  Sort,
  SubscribeCard,
} from "@/components/Home";
import { getAuthor, getCategories, getPosts } from "@/lib/api";
import { getDictionary } from "@/lib/i18n/getDictionary";
import { Locale } from "@/lib/i18n/i18n-config";
import { formatCategory } from "@/lib/utils/formatCategory";
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

  const author = await getAuthor(lang);
  const categories = await getCategories(lang);

  const {
    home: {
      sort: { options, placeholder: sortPlaceholder },
      search: { placeholder: searchPlaceholder },
      pagination,
      subscribeCard,
      noPostsFound,
    },
    common: { minRead },
  } = await getDictionary(lang);

  return (
    <div className="main-container pb-8 pt-3">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <Search placeholder={searchPlaceholder} />
        <Sort options={options} placeholder={sortPlaceholder} />
      </div>
      <div className="mb-6">
        <Filter categories={categories} />
      </div>
      <div className="grid grid-cols-7 gap-6">
        <div className="col-span-7 lg:col-span-5 ">
          <div className="flex flex-col gap-6">
            {posts.length > 0
              ? posts.map((post) => {
                  const { minutes } = readingTime(
                    post.attributes.content ?? ""
                  );

                  return (
                    <PostCard
                      key={post.id}
                      attributes={post.attributes}
                      readingTime={`${Math.round(minutes)} ${minRead}`}
                      id={post.id}
                    />
                  );
                })
              : noPostsFound}
          </div>
        </div>
        <div className="col-span-7 lg:order-3">
          {pageCount > 1 ? (
            <Pagination totalPages={pageCount} dictionary={pagination} />
          ) : null}
        </div>
        <div className="col-span-7 lg:col-span-2 flex gap-6 flex-col">
          {author?.attributes ? (
            <div className="hidden lg:block">
              <AuthorCard attributes={author.attributes} />
            </div>
          ) : null}
          <div className="max-w-[420px] self-center">
            <SubscribeCard dictionary={subscribeCard} />
          </div>
        </div>
      </div>
    </div>
  );
}
