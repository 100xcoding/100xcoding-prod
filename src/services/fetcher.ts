import Env from "@/lib/env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: `${Env.NEXT_PUBLIC_URL}/api`,
});

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export default fetcher;
