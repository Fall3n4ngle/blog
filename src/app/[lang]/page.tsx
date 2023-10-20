import AuthorCard from "@/components/Home/AuthorCard";
import PostCard from "@/components/Home/PostCard";
import { getHomePageData } from "@/lib/api/homePage";
import readingTime from "reading-time";

export default async function Home() {
  const { author, categories, posts } = await getHomePageData();

  return (
    <main>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-7 lg:col-span-5 flex flex-col gap-3">
          {posts.map((post) => {
            const time = readingTime(post.attributes.content ?? "");

            return (
              <PostCard
                key={post.id}
                attributes={post.attributes}
                readingTime={time.text}
              />
            );
          })}
        </div>
        <div className="col-span-2 hidden lg:block">
          <AuthorCard attributes={author.attributes} />
        </div>
      </div>
    </main>
  );
}
