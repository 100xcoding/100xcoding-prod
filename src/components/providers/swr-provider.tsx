"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";
import fetcher from "@/services/fetcher";
const SWRProvider = ({ children }: { children: ReactNode }) => {
	return <SWRConfig
    value={{
      fetcher,
      // refreshInterval: 3000,
      // revalidateIfStale: false,
      // revalidateOnFocus: false,
      // revalidateOnReconnect: false,
    }}
  >
    {children}
  </SWRConfig>
};

export default SWRProvider;
