import { Card, CardContent } from "@/components/ui";
import Image from "next/image";
import ImageNotFound from "../ImageNotFound";

type Props = Pick<Author, "attributes">;

export default function AuthorCard({
  attributes: { bio, image, name, position },
}: Props) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="relative pt-[72%] mb-4">
          {image.data?.attributes?.url ? (
            <Image
              src={process.env.CMS_URL + image.data.attributes.url}
              alt={name}
              fill
              className="rounded-md object-cover"
            />
          ) : (
            <ImageNotFound />
          )}
        </div>
        <h3 className="font-title scroll-m-20 text-3xl font-semibold tracking-tight mb-2">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{position}</p>
        <p className="leading-7 text-sm">{bio}</p>
      </CardContent>
    </Card>
  );
}
