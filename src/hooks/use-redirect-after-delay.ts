"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Custom hook to redirect to a specified URL after a given delay.
 *
 * @param {string} url - The URL to redirect to.
 * @param {number} delay - The delay in milliseconds before the redirect happens.
 */
const useRedirectAfterDelay = (url: string, delay: number) => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(url);
    }, delay);

    // Cleanup the timer if the component is unmounted or the URL changes
    return () => clearTimeout(timer);
  }, [url, delay, router]);
};

export default useRedirectAfterDelay;
