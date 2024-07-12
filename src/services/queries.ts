import useSWR, { mutate } from "swr";
import fetcher from "./fetcher";

export function useProfile() {
  const cacheKey = "/user/profile";
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshProfile = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };

  return {
    data,
    error,
    refreshProfile,
  };
}
export function useChallengeCategories() {
  const cacheKey = "/categories";
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshChallengeCategoriesData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshChallengeCategoriesData,
  };
}
export function useChallengeTech() {
  const cacheKey = "/tech";
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshChallengeTechData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshChallengeTechData,
  };
}
export function useCreatorChallenges() {
  const cacheKey = "/creator/challenges";
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshCreatorChallengesData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshCreatorChallengesData,
  };
}
export function useCreatorChallengeById(challengeId: string) {
  const cacheKey = `/creator/challenges/${challengeId}`;
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshCreatorChallengeData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshCreatorChallengeData,
  };
}

export function useCreatorQuizes() {
  const cacheKey = "/creator/quizes";
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshCreatorQuizesData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshCreatorQuizesData,
  };
}
export function useCreatorQuizById(quizId: string) {
  const cacheKey = `/creator/quizes/${quizId}`;
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshCreatorQuizData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshCreatorQuizData,
  };
}
export function useQuizCategories() {
  const cacheKey = "/creator/quizes/categories";
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshQuizCategoriesData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshQuizCategoriesData,
  };
}
export function useCreatorQuizQuestionById(questionId: string, quizId: string) {
  const cacheKey = `/creator/quizes/${quizId}/${questionId}`;
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshCreatorQuizQuestionData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshCreatorQuizQuestionData,
  };
}
export function useChallengeBySlug(slug: string) {
  const cacheKey = `/challenge/${slug}`;
  const { data, error } = useSWR(cacheKey, fetcher);
  const refreshChallengeBySlugData = async () => {
    await mutate(cacheKey); // Trigger revalidation for the specific cache key
  };
  return {
    data,
    error,
    refreshChallengeBySlugData,
  };
}
