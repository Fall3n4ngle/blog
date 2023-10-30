import { CalendarDays, Timer } from "lucide-react";
import { Badge } from "@/components/ui";
import ImageNotFound from "../ImageNotFound";
import Image from "next/image";

type Props = {
  image: Post["attributes"]["image"];
  name: string;
  readingTime: string;
  publishedAt: string;
  date: string;
  categories: Post["attributes"]["categories"];
};

export default function PostDescription({
  categories,
  date,
  image,
  name,
  publishedAt,
  readingTime,
}: Props) {
  return (
    <>
      <div className="relative pt-[55%] mb-7">
        {image.data[0]?.attributes?.url ? (
          <Image
            src={process.env.CMS_URL + image.data[0].attributes.url}
            alt={name}
            fill
            className="rounded-md object-cover"
            priority
          />
        ) : (
          <ImageNotFound />
        )}
      </div>
      <h2 className="mb-2 scroll-m-20 text-3xl sm:text-4xl font-semibold tracking-tight font-title">
        {name}
      </h2>
      <div className="flex mb-7 gap-8 text-muted-foreground justify-between items-center text-sm sm:text-base">
        <div className="flex items-center gap-2">
          <Timer /> {readingTime}
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays /> <time dateTime={publishedAt}>{date}</time>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {categories.data.map((category) => (
          <Badge key={category.id} className="cursor-default">
            {category.attributes.name}
          </Badge>
        ))}
      </div>
    </>
  );
}
