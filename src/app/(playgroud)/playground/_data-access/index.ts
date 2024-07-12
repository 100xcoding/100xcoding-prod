"use server";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";

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
