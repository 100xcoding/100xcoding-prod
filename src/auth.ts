import NextAuth, { Account, Profile } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { Adapter, AdapterUser } from "next-auth/adapters";
import Env from "./lib/env";
import { db } from "./lib/db";
import { CustomUser } from "./types";

declare module "next-auth" {
	interface Session {
		user?: CustomUser;
	}

	interface User extends CustomUser {}
}

declare module "next-auth/jwt" {
	interface JWT {
		role?: string | null;
		user?: CustomUser;
	}
}
export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	secret: Env.AUTH_SECRET,
	providers: [
		GitHub({
			clientId: Env.AUTH_GITHUB_ID,
			clientSecret: Env.AUTH_GITHUB_SECRET,
			allowDangerousEmailAccountLinking: true,
			profile(profile) {
				return {
					role: "user",
					email: profile.email,
					name: profile.name,
					username: profile.login,
					image: profile.avatar_url,
				};
			},
		}),
	],
	callbacks: {
		// async signIn({
		// 	user,
		// 	account,
		// 	profile,
		// }: {
		// 	user: any;
		// 	account: Account | null;
		// 	profile?: Profile | undefined;
		// }) {
		// 	if (account?.provider === "github") {
		// 		const checkUser = await prisma.user.upsert({
		// 			where: { email: profile?.email! },
		// 			update: {
		// 				name: profile?.name,
		// 				image: profile?.avatar_url!,
		// 			},
		// 			create: {
		// 				name: profile?.name!,
		// 				email: profile?.email!,
		// 				image: profile?.avatar_url!,
		// 				username: profile?.login!,
		// 			},
		// 		});
		// 		if (checkUser) {
		// 			return true;
		// 		} else {
		// 			return false;
		// 		}
		// 	}
		// 	// console.log("Account :", account);
		// 	// console.log("USER ", user);
		// 	// console.log("PROFILE :", profile);
		// 	return true;
		// },
		jwt({ token, user }) {
			if (user) {
				user.role = user.role == null ? "user" : user?.role;
				token.user = user as CustomUser;
			}
			return token;
		},
		session({ session, token }) {
			if (token.user) {
				session.user = token.user as AdapterUser;
			}
			return session;
		},
	},
});
