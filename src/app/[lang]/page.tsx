import {
  AuthorCard,
  Filter,
  Pagination,
  PostCard,
  Search,
  Sort,
} from "@/components/Home";
import { getHomePageData, getPosts } from "@/lib/api/homePage";
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
};

const pageSize = 5;

export default async function Home({
  searchParams: { sort, name, category, page },
}: Props) {
  const categoryFilter = category ? formatCategory(category) : "";

  const {
    posts,
    meta: {
      pagination: { pageCount },
    },
  } = await getPosts({ sort, name, category: categoryFilter, page, pageSize });

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
              />
            );
          })}
        </div>
        <div className="col-span-2 hidden lg:block">
          <AuthorCard attributes={author.attributes} />
        </div>
      </div>
      <Pagination totalPages={pageCount} />
    </>
  );
}

export async function generateMetadata() {
  return {} as Metadata;
}
