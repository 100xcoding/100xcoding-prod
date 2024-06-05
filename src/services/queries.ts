import useSWR, { mutate } from "swr";
import fetcher from "./fetcher";

export function useProfile() {
    const cacheKey = "/user/profile"
    const {data,error} = useSWR(cacheKey,fetcher);
    const refreshProfile = async () => {
        await mutate(cacheKey); // Trigger revalidation for the specific cache key
    };

    return {
        data,error,refreshProfile
    }
}
export function useChallengeCategories() {
    const cacheKey = "/categories"
    const {data,error} = useSWR(cacheKey,fetcher);
    const refreshChallengeCategoriesData = async () => {
        await mutate(cacheKey); // Trigger revalidation for the specific cache key
    };
    return {
        data,error,refreshChallengeCategoriesData
    }
}
export function useCreatorChallenges() {
    const cacheKey = "/creator/challenges"
    const {data,error} = useSWR(cacheKey,fetcher);
    const refreshCreatorChallengesData = async () => {
        await mutate(cacheKey); // Trigger revalidation for the specific cache key
    };
    return {
        data,error,refreshCreatorChallengesData
    }
}
export function useCreatorChallengeById(challengeId:string) {
    const cacheKey = `/creator/challenges/${challengeId}`
    const {data,error} = useSWR(cacheKey,fetcher);
    const refreshCreatorChallengeData = async () => {
        await mutate(cacheKey); // Trigger revalidation for the specific cache key
    };
    return {
        data,error,refreshCreatorChallengeData
    }
}