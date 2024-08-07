"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function getUnpublishSolutionBySlug(slug: string) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login?msg='sign-in first' ");
  }
  try {
    const solution = await db.challengeSolution.findUnique({
      where: {
        slug: slug.concat(session?.user.id),
        userId: session?.user.id!,
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
