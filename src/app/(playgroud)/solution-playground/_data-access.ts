"use server";

import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";

export async function getChallengeSolutionBySlug(slug: string) {
  // const session = await auth();
  // console.log(session);
  // if (!session || !session.user || !session.user.id) {
  //   redirect("/?msg='sign-in first' ");
  // }
  try {
    const solution = await db.challengeSolution.findUnique({
      where: {
        slug,
        status: true,
      },
      include: {
        challenge: true,
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
