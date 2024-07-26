"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { ProfileFormSchema, SocialLinkFormSchema } from "@/schema";
import { redirect } from "next/navigation";
import { z } from "zod";
type Inputs = z.infer<typeof ProfileFormSchema>;
type SocialInput = z.infer<typeof SocialLinkFormSchema>;
export async function updateProfile(data: Inputs) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      redirect("/login?msg='sign-in first' ");
    }
    const result = ProfileFormSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    // console.log(result);
    // console.log(profileImage);
    await db.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name: result?.data?.name,
      },
    });
    const profile = await db.profile.findUnique({
      where: { userId: session?.user?.id },
    });
    if (!profile) {
      await db.profile.create({
        data: {
          title: result?.data?.title,
          bio: result?.data?.bio,
          website: result?.data?.website,
          userId: session?.user?.id,
        },
      });
    } else {
      await db.profile.update({
        where: {
          userId: session?.user?.id,
        },
        data: {
          title: result?.data?.title,
          bio: result?.data?.bio,
          website: result?.data?.website,
        },
      });
    }
    return {
      success: true,
      message: "Update Successfully!",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      err: getErrorMessage(error),
    };
  }
}
export async function addSocialLink(data: SocialInput) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login?msg='Login first!' ");
  }
  const result = SocialLinkFormSchema.safeParse(data);
  // console.log(result);
  if (result.error) {
    return { success: false, error: result.error.format() };
  }
  try {
    const isSocialLink = await db.socialLink.findUnique({
      where: {
        userId: session?.user?.id,
      },
    });
    // console.log(isSocialLink);
    if (isSocialLink) {
      await db.socialLink.update({
        where: {
          userId: session?.user?.id,
        },
        data: {
          ...result?.data,
        },
      });
    } else {
      await db.socialLink.create({
        data: {
          userId: session?.user?.id,
          ...result?.data,
        },
      });
    }
    return {
      success: true,
      data: "",
      message: "added successfully",
    };
  } catch (error) {
    // console.log(error);
    return {
      success: false,
      message: "Something went wrong, Try again!",
      err: getErrorMessage(error),
    };
  }
}
