"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function getProfile() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/login?msg='Login first!' ");
    }
    const profile = await db.profile.findUnique({
      where: {
        userId: session?.user?.id,
      },
      include: {
        user: {
          select: {
            email: true,
            username: true,
          },
        },
      },
    });
    return {
      success: true,
      profile,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function getSocialTypes() {
  try {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/login?msg='Login first!' ");
    }
    const socialLinkTypes = await db.socialLinkType.findMany({});
    return {
      success: true,
      socialLinkTypes,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
