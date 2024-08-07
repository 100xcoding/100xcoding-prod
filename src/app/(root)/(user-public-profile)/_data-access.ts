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
    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
      include: {
        profile: true,
      },
    });

    return {
      success: true,
      user,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
