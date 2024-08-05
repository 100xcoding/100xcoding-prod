import { useSession } from "next-auth/react";
import { useMemo } from "react";

// export const useCurrentUser = () => {
//   const session = useSession();
//   return session?.data?.user;
// };
export const useCurrentUser = () => {
  const { data: session } = useSession();
  const user = useMemo(() => session?.user, [session]);
  return user;
};
