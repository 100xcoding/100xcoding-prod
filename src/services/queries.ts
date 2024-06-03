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