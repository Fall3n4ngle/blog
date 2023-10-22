import { AuthorCard, Filter, PostCard, Search, Sort } from "@/components/Home";
import { getHomePageData, getPosts } from "@/lib/api/homePage";
import readingTime from "reading-time";

type Props = {
  searchParams: {
    sort?: SortBy;
  };
};

export default async function Home({ searchParams: { sort } }: Props) {
  const { author, categories } = await getHomePageData();
  const { posts } = await getPosts({ sort });

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <Search />
        <Sort />
      </div>
      <div className="mb-6">
        <Filter categories={categories} />
      </div>
      <div className="grid grid-cols-7 gap-4">
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
    </>
  );
}
