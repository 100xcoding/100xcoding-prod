import Env from "@/lib/env";
import { MetadataRoute } from "next";
import { getAllChallenges } from "./(root)/challenges/_data-access";
import { getChallengeSolutions } from "./(root)/solutions/_data-access";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = Env.NEXT_PUBLIC_URL;
  const { challenges } = await getAllChallenges();
  const { solutions } = await getChallengeSolutions();
  const challengesUrls =
    challenges?.map((challenge) => {
      return {
        url: `${baseUrl}/challenges/${challenge?.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];
  const solutionsUrls =
    solutions?.map((solution) => {
      return {
        url: `${baseUrl}/solutions/${solution.slug}`,
        lastModified: new Date(solution?.updatedAt),
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
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
    },
    ...challengesUrls,
    ...solutionsUrls,
  ];
}
