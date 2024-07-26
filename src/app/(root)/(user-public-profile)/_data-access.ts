"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function getPublicProfile(username: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      include: {
        profile: true,
        socialLink: true,
      },
    });
    const userPublishChallenges = await db.challengeSolution.findMany({
      where: {
        userId: user?.id,
      },
      include: {
        user: true,
        challenge: {
          include: {
            challengeCategory: true,
          },
        },
      },
    });
    if (!user) {
      return {
        success: false,
        message: "user not found!",
      };
    }
    return {
      success: true,
      user,
      userPublishChallenges,
      message: "success",
    };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong, Try again!",
      err: getErrorMessage(error),
    };
  }
}
export async function getProfile() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/login?msg='Login first!' ");
    }
    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      include: {
        profile: true,
      },
    });

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
// export async function getSocialTypes() {
//   try {
//     const session = await auth();
//     if (!session || !session.user) {
//       redirect("/login?msg='Login first!' ");
//     }
//     const socialLinkTypes = await db.socialLinkType.findMany({});
//     return {
//       success: true,
//       socialLinkTypes,
//     };
//   } catch (error) {
//     return {
//       success: false,
//       err: getErrorMessage(error),
//       message: "Something went wrong",
//     };
//   }
// }
