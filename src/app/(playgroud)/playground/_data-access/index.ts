"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function getChallenge(slug: string) {
  try {
    const challenge = await db.challenge.findUnique({
      where: {
        publish: true,
        slug: slug,
      },
      include: {
        challengeCategory: true,
      },
    });
    return {
      success: true,
      challenge,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function getSolutionBySlug(slug: string) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/?msg='sign-in first' ");
  }
  try {
    const challenge = await db.challengeSolution.findUnique({
      where: {
        slug: slug,
        userId: session?.user.id!,
      },
    });
    return {
      success: true,
      challenge,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
