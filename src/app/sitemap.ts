import Env from "@/lib/env";
import { MetadataRoute } from "next";
import { getAllChallenges } from "./(root)/challenges/_data-access";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = Env.NEXT_PUBLIC_URL;
  const { challenges } = await getAllChallenges();
  const challengesUrls =
    challenges?.map((challenge) => {
      return {
        url: `${baseUrl}/challenges/${challenge?.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];
  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/challenges`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
    },
    ...challengesUrls,
    //TODO:add solutions urls
    // add dynamic pages data
  ];
}
