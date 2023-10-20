import { Badge, Card, CardContent } from "@/components/ui";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Timer,
  CalendarDays,
} from "lucide-react";
import { getDate } from "@/lib/utils/getDate";

type Props = Pick<Post, "attributes"> & {
  readingTime: string;
};

export default function PostCard({
  attributes: { categories, createdAt, excerpt, image, name },
  readingTime,
}: Props) {
  const date = getDate(createdAt)

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-5 gap-5">
          <div className="col-span-2">
            <div className="relative overflow-hidden pt-[75%] ">
              <Image
                src={"http://localhost:1337" + image.data[0].attributes.url}
                alt={name}
                fill
                className="rounded-md object-cover"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-3">
                {categories.data.map((category) => (
                  <Badge key={category.id}>{category.attributes.name}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="col-span-3 pt-6">
            <h2 className="relative after:block after:content-[''] after:absolute after:h-[3px] after:bg-primary after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left font-title hover:text-primary cursor-pointer transition-all scroll-m-20 text-4xl font-semibold tracking-tight first:mt-0 mb-5">
              {name}
            </h2>
            <div className="leading-7 mb-5 text-muted-foreground flex items-start gap-2.5">
              <span>Share:</span>
              <Facebook
                size={22}
                className="hover:text-primary transition-all cursor-pointer"
              />
              <Twitter
                size={22}
                className="hover:text-primary transition-all cursor-pointer"
              />
              <Instagram
                size={22}
                className="hover:text-primary transition-all cursor-pointer"
              />
            </div>
            <p className="leading-7 text-sm mb-5">{excerpt}</p>
            <div className="flex gap-8 text-muted-foreground ">
              <div className="flex items-center gap-2">
                <Timer /> {readingTime}
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays /> {date}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
