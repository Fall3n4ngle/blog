import { getPostsMeta } from "@/lib/api/getPostsMeta";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "http://localhost:3000/";

  const posts = await getPostsMeta();
  const postsUrls = posts.map(({ id }) => ({
    url: `${baseUrl}/${id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  } as const));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...postsUrls,
  ];
}
