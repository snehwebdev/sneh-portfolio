import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://sneh-portfolio-pi.vercel.app",
      lastModified: new Date(),
      priority: 1,
    },
  ];
}