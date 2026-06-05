import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    "https://sneh-portfolio-pi.vercel.app";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },

    {
      url: `${baseUrl}/#projects`,
      lastModified: new Date(),
      priority: 0.9,
    },

    {
      url: `${baseUrl}/#services`,
      lastModified: new Date(),
      priority: 0.8,
    },

    {
      url: `${baseUrl}/#about`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ];
}