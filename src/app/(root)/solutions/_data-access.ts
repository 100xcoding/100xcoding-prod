"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";
export async function getComments(slug: string) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/?msg='sign-in first' ");
  }
  try {
    const page = 1;
    const pageSize = 10;
    const comments = await db.comment.findMany({
      where: {
        challengeSolution: {
          slug,
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        user: {
          select: {
            username: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
        likes: {
          where: {
            userId: session?.user?.id,
          },
          select: {
            id: true,
          },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });
    const formattedComments = comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      userId: comment.userId,
      user: comment.user,
      likeCount: comment._count.likes,
      userHasLiked: comment.likes.length > 0,
    }));
    return {
      success: true,
      formattedComments,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
