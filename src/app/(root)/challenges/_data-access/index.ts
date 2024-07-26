"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function getChallenges({
  take,
  skip,
}: {
  take: number;
  skip: number;
}) {
  try {
    const challenges = await db.challenge.findMany({
      where: {
        publish: true,
      },
      take,
      skip,
      include: {
        challengeCategory: true,
      },
    });
    const total = await db.challenge.count();
    return {
      success: true,
      challenges,
      metadata: {
        hasNextPage: skip + take < total,
        totalPages: Math.ceil(total / take),
      },
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
export async function getAllChallenges() {
  try {
    const challenges = await db.challenge.findMany({
      where: {
        publish: true,
      },
      select: {
        slug: true,
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
