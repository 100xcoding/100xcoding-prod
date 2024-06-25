import NextAuth, { Account, Profile } from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient, User } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { Adapter, AdapterUser } from "next-auth/adapters";
import Env from "./lib/env";
import { db } from "./lib/db";
import { CustomUser } from "./types";
import Resend from "next-auth/providers/resend";
import { randomBytes } from "crypto";

// Utility function to generate a unique username
const generateUniqueUsername = async (email: string) => {
  let username = email.split("@")[0];
  let uniqueUsername = username;
  let isUnique = false;
  const maxAttempts = 5;
  let attempt = 0;

  while (!isUnique && attempt < maxAttempts) {
    const existingUser = await db.user.findUnique({
      where: { username: uniqueUsername },
    });

    if (existingUser) {
      uniqueUsername = `${username}_${randomBytes(3).toString("hex")}`;
      attempt++;
    } else {
      isUnique = true;
    }
  }

  if (!isUnique) {
    throw new Error("Unable to generate a unique username.");
  }

  return uniqueUsername;
};

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
  pages: {
    signIn: "/",
    verifyRequest: "/verification",
  },
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
    Resend({
      apiKey: Env.RESEND_API_KEY,
      from: "test@codify.siddhantjain.co.in",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider === "github") {
        // GitHub provider sign-in logic
        const existingUser = await db.user.findUnique({
          where: { email: profile.email },
        });
        if (!existingUser) {
          const username = await generateUniqueUsername(profile.email);
          await db.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              image: profile.avatar_url,
              username,
            },
          });
        } else {
          await db.user.update({
            where: { email: profile.email },
            data: {
              name: profile.name,
              image: profile.avatar_url,
            },
          });
        }
      } else if (account.provider === "resend") {
        // Magic URL (Resend) provider sign-in logic
        const existingUser = await db.user.findUnique({
          where: { email: user.email },
        });
        if (!existingUser) {
          const username = await generateUniqueUsername(user.email);
          await db.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
              username,
            },
          });
        } else {
          await db.user.update({
            where: { email: user.email },
            data: {
              name: user.name,
              image: user.image,
            },
          });
        }
      }
      return true;
    },
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
