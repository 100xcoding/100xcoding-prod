import NextAuth, { Account, Profile } from "next-auth";
import GitHub from "next-auth/providers/github";
import Discord from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "next-auth/jwt";
import { Adapter, AdapterUser } from "next-auth/adapters";
import Env from "./lib/env";
import { db } from "./lib/db";
import { CustomUser } from "./types";
import Resend from "next-auth/providers/resend";
import { authSendRequest } from "./lib/authSendRequest";
const generateRandomSuffix = () => {
  const timestamp = Date.now().toString(36); // Convert current timestamp to base36
  const randomNum = Math.floor(Math.random() * 1000).toString(36); // Generate a random number and convert to base36
  return `${timestamp}${randomNum}`;
};
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
      uniqueUsername = `${username}_${generateRandomSuffix()}`;
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
    signIn: "/login",
    signOut: "/",
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
    Discord({
      authorization: { params: { scope: "guilds+join identify" } },
      clientId: Env.AUTH_DISCORD_ID,
      clientSecret: Env.AUTH_DISCORD_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Resend({
      server: Env.RESEND_API_KEY,
      from: `100xCoding <${Env.RESEND_EMAIL}>`,
      sendVerificationRequest(params) {
        authSendRequest(params);
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }: any) {
      if (account.provider === "github") {
        // GitHub provider sign-in logic
        const existingUser = await db.user.findUnique({
          where: { email: profile.email },
        });
        const userNameCheck = await db.user.findUnique({
          where: {
            username: profile?.login,
          },
        });
        if (!existingUser) {
          const username = userNameCheck
            ? await generateUniqueUsername(profile.email)
            : profile?.login;
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
              name: user?.name ? user?.name : username,
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
      } else if (account.provider == "discord") {
        // GitHub provider sign-in logic
        const existingUser = await db.user.findUnique({
          where: { email: profile.email },
        });
        const userNameCheck = await db.user.findUnique({
          where: {
            username: profile?.username,
          },
        });
        if (!existingUser) {
          const username = userNameCheck
            ? await generateUniqueUsername(profile.email)
            : profile?.username;
          await db.user.create({
            data: {
              name: profile.name,
              email: profile.email,
              image: profile.image_url,
              username: profile.username,
            },
          });
        } else {
          await db.user.update({
            where: { email: profile.email },
            data: {
              name: profile.name,
              image: profile.image_url,
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
    async redirect({ url, baseUrl }) {
      // if (url.startsWith(baseUrl)) return url;
      // return baseUrl;
      const redirectUrl = new URL(url, baseUrl).searchParams.get("redirect");

      if (redirectUrl) return `${baseUrl}${redirectUrl}`;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
});
