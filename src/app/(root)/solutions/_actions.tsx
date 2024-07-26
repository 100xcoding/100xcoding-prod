"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { ChallengeSolutionCommentSchema } from "@/schema/challenge-schema";
import { redirect } from "next/navigation";
import { z } from "zod";

type ChallengeAuthorInput = z.infer<typeof ChallengeSolutionCommentSchema>;

export async function AddSolutionFeedback(
  data: ChallengeAuthorInput,
  slug: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/?msg='sign-in first' ");
    }
    const result = ChallengeSolutionCommentSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      await db.comment.create({
        data: {
          content: result.data.content,
          userId: session?.user?.id,
          challengeSolutionSlug: slug,
        },
      });
      return {
        success: true,
        message: "feedback added Successfully!",
      };
    }
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function updateSolutionFeedback(
  data: ChallengeAuthorInput,
  id: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/?msg='sign-in first' ");
    }
    const result = ChallengeSolutionCommentSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      await db.comment.update({
        where: {
          id: id,
          userId: session?.user?.id,
        },
        data: {
          content: result.data.content,
        },
      });
      return {
        success: true,
        message: "feedback updated Successfully!",
      };
    }
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function deleteSolutionFeedback(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/?msg='sign-in first' ");
    }
    await db.comment.delete({
      where: {
        id: id,
        userId: session?.user?.id,
      },
    });
    return {
      success: true,
      message: "feedback deleted Successfully!",
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function addCommentLike(commentId: string) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/?msg='sign-in first' ");
    }
    const existingLike = await db.commentLike.findUnique({
      where: {
        commentId_userId: {
          commentId: commentId,
          userId: session?.user?.id,
        },
      },
    });
    if (existingLike) {
      return {
        success: false,
        message: "already liked!",
      };
    }
    const newLike = await db.commentLike.create({
      data: {
        userId: session?.user?.id,
        commentId: commentId,
      },
    });
    return {
      success: true,
      message: "liked Successfully!",
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
