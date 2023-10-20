import { Card, CardContent } from "@/components/ui";
import Image from "next/image";

type Props = Pick<Author, "attributes">;

export default function AuthorCard({
  attributes: { bio, image, name, position },
}: Props) {
  console.log(image.data.attributes.url);

  return (
    <Card>
      <CardContent className="p-4">
        <div className="relative pt-[72%] mb-4">
          <Image
            src={"http://localhost:1337" + image.data.attributes.url}
            alt={name}
            fill
            className="rounded-md object-cover"
          />
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
