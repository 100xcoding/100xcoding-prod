import { useSession as useAuthSession } from "next-auth/react";

export const useSession = () => {
	const session = useAuthSession();
	return session;
};
