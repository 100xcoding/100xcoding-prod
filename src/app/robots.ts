import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/portal",
    },
    // TODO:fix the sidemapURL
    sitemap: "/sitemap.xml",
  };
}
