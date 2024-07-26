import Env from "@/lib/env";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = Env.NEXT_PUBLIC_URL;
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/challenges", "/solutions", "/login"],
      disallow: "/portal",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
