"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function getChallenges() {
  try {
    const challenges = await db.challenge.findMany({
      where: {
        publish: true,
      },
      include: {
        challengeCategory: true,
      },
    });
    return {
      success: true,
      challenges,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
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
