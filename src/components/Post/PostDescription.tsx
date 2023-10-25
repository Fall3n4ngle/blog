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
      <div className="relative pt-[62%] mb-7">
        {image.data[0]?.attributes?.url ? (
          <Image
            src={"http://localhost:1337" + image.data[0].attributes.url}
            alt={name}
            fill
            className="rounded-md object-cover"
            priority
          />
        ) : (
          <ImageNotFound />
        )}
      </div>
      <h2 className="mb-4 scroll-m-20 text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight">
        {name}
      </h2>
      <div className="flex mb-7 gap-8 text-muted-foreground justify-between items-center ">
        <div className="flex items-center gap-2">
          <Timer /> {readingTime}
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays /> <time dateTime={publishedAt}>{date}</time>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {categories.data.map((category) => (
          <Badge key={category.id}>{category.attributes.name}</Badge>
        ))}
      </div>
    </>
  );
}
