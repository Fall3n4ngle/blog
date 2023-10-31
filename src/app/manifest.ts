import { metadata } from "@/lib/metadata";
import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: metadata.title,
    short_name: metadata.title,
    description: metadata.description,
    start_url: "/",
    display: "standalone",
    background_color: "#020817",
    theme_color: "#3c83f6",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
    categories: ["social", "education", "entertainment"]
  };
}
