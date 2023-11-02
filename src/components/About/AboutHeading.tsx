import Image from "next/image";
import React from "react";
import ImageNotFound from "../ImageNotFound";

type Props = {
  image: Author["attributes"]["image"];
  name: Author["attributes"]["name"];
  position: Author["attributes"]["position"];
  bio: Author["attributes"]["bio"];
};

export default function AboutHeading({ bio, image, name, position }: Props) {
  return (
    <>
      <div className="relative pt-[55%] mb-7">
        {image.data?.attributes?.url ? (
          <Image
            src={process.env.CMS_URL + image.data.attributes.url}
            alt={name}
            fill
            className="rounded-md object-cover"
            priority
          />
        ) : (
          <ImageNotFound />
        )}
      </div>
      <h2 className="mb-4 scroll-m-20 text-3xl sm:text-4xl font-semibold tracking-tight font-title">
        {name}
      </h2>
      <p className="text-muted-foreground mb-4 text-sm sm:text-base">
        {position}
      </p>
      <p className="text-sm sm:text-base sm:leading-7">{bio}</p>
    </>
  );
}
