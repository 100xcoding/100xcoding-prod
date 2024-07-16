"use server";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";

export async function getChallengeSolutions() {
  try {
    const solutions = await db.challengeSolution.findMany({
      where: {
        status: true,
      },
      include: {
        challenge: {
          include: {
            challengeCategory: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return {
      success: true,
      solutions,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function getChallengeSolution(slug: string) {
  try {
    const solution = await db.challengeSolution.findUnique({
      where: {
        status: true,
        slug,
      },
      include: {
        challenge: {
          include: {
            challengeCategory: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return {
      success: true,
      solution,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function getComments(slug: string) {
  try {
    const comments = await db.comment.findMany({
      where: {
        challengeSolutionSlug: slug,
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });
    return {
      success: true,
      comments,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function getComment(id: string) {
  try {
    const comment = await db.comment.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });
    return {
      success: true,
      comment,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
