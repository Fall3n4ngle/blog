import { Badge, Card, CardContent } from "@/components/ui";
import Image from "next/image";
import { Timer, CalendarDays } from "lucide-react";
import { getDate } from "@/lib/utils/getDate";
import Link from "next/link";
import ImageNotFound from "../ImageNotFound";

type Props = Pick<Post, "attributes"> & {
  readingTime: string;
  id: string;
};

export default function PostCard({
  attributes: { categories, publishedAt, excerpt, image, name },
  readingTime,
  id,
}: Props) {
  const date = getDate(publishedAt);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-5 sm:gap-5">
          <div className="sm:col-span-2">
            <div className="relative overflow-hidden pt-[75%] ">
              {image.data[0]?.attributes?.url ? (
                <Image
                  src={process.env.CMS_URL + image.data[0].attributes.url}
                  alt={name}
                  fill
                  className="rounded-md object-cover"
                />
              ) : (
                <ImageNotFound />
              )}
              <div className="absolute bottom-3 left-3 flex items-center gap-3">
                {categories.data.map((category) => (
                  <Badge key={category.id} className="cursor-default">
                    {category.attributes.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="sm:col-span-3 pt-6">
            <div className="mb-5">
              <Link href={`/${id}`}>
                <h2 className="inline relative after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left font-title hover:text-primary cursor-pointer transition-all scroll-m-20 text-2xl sm:text-4xl font-semibold tracking-tight ">
                  {name}
                </h2>
              </Link>
            </div>
            <p className="!leading-7 text-xs sm:text-sm mb-5">{excerpt}</p>
            <div className="flex gap-8 text-muted-foreground justify-between sm:justify-start sm:text-sm items-center text-xs">
              <div className="flex items-center gap-2">
                <Timer /> {readingTime}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays /> <time dateTime={publishedAt}>{date}</time>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
