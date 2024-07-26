"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";

export async function createChallengeSolution(data: any, slug: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      redirect("/login?msg='sign-in first' ");
    }
    if (!data || !slug) {
      return { success: false, message: "Data missing" };
    }
    const challenge = await db.challenge.findUnique({
      where: {
        slug,
        publish: true,
      },
    });
    if (!challenge) {
      return { success: false, message: "invalid challenge" };
    }
    // console.log(challenge);
    // console.log(data);
    // console.log(data.files);
    // console.log(data.files["/index.html"]?.code!);
    const solution = await db.challengeSolution.create({
      data: {
        userId: session?.user?.id!,
        challengeId: challenge?.id!,
        slug: slug.concat(session?.user?.id),
        htmlContent: data.files["/index.html"]?.code!,
        jsContent: data.files["/index.js"]?.code!,
        cssContent: data.files["/src/styles.css"]?.code!,
      },
    });
    // console.log(solution);
    return { success: true, message: "saved successfully!" };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function updateChallengeSolution(data: any, slug: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      redirect("/login?msg='sign-in first' ");
    }
    if (!data || !slug) {
      return { success: false, message: "something went wrong" };
    }
    const challenge = await db.challenge.findUnique({
      where: {
        slug,
        publish: true,
      },
    });
    if (!challenge) {
      return { success: false, message: "invalid challenge" };
    }
    const challengeSolution = await db.challengeSolution.update({
      where: { slug: slug.concat(session?.user?.id) },
      data: {
        htmlContent: data.files["/index.html"]?.code!,
        jsContent: data.files["/index.js"]?.code!,
        cssContent: data.files["/src/styles.css"]?.code!,
      },
    });

    // console.log(challenge);
    // console.log(data);
    // console.log(data.files);
    // console.log(data.files["/index.html"]?.code!);
    //   const solution = await db.challengeSolution.create({
    //     data: {
    //       userId: session?.user?.id!,
    //       challengeId: challenge?.id!,
    //       slug: slug,
    //       htmlContent: data.files["/index.html"]?.code!,
    //       jsContent: data.files["/index.js"]?.code!,
    //       cssContent: data.files["/src/styles.css"]?.code!,
    //     },
    //   });
    return { success: true, message: "updated successfully!" };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function publishChallengeSolution(slug: string) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      redirect("/?msg='sign-in first' ");
    }
    if (!slug) {
      return { success: false, message: "something went wrong" };
    }
    const challenge = await db.challenge.findUnique({
      where: {
        slug,
        publish: true,
      },
    });
    if (!challenge) {
      return { success: false, message: "invalid challenge" };
    }
    await db.challengeSolution.update({
      where: { slug: slug.concat(session?.user?.id) },
      data: {
        status: true,
      },
    });

    // console.log(challenge);
    // console.log(data);
    // console.log(data.files);
    // console.log(data.files["/index.html"]?.code!);
    //   const solution = await db.challengeSolution.create({
    //     data: {
    //       userId: session?.user?.id!,
    //       challengeId: challenge?.id!,
    //       slug: slug,
    //       htmlContent: data.files["/index.html"]?.code!,
    //       jsContent: data.files["/index.js"]?.code!,
    //       cssContent: data.files["/src/styles.css"]?.code!,
    //     },
    //   });
    return { success: true, message: "completed successfully!" };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
