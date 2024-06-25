"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { ProfileFormSchema } from "@/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
type Inputs = z.infer<typeof ProfileFormSchema>;
export async function updateProfileAction(data: Inputs) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "user") {
      redirect("/?msg='sign-in first' ");
    }
    const result = ProfileFormSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      const profileData = await db.profile.update({
        where: {
          userId: session.user.id,
        },
        data: {
          ...result?.data,
        },
      });
      return { success: true, data: profileData };
    }
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
    };
  }
  //TODO: Add Revalidate function
}
export async function updateProfileImageAction(fileName: string) {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "user") {
    redirect("/?msg='sign-in first' ");
  }
  if (!fileName) {
    return {
      success: false,
      message: "Something went wrong, Try again!",
    };
  }
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!profile) {
      const createProfile = await db.profile.create({
        data: {
          userId: session.user.id,
          profileImage: fileName,
        },
      });
      revalidatePath("/profile");
      return {
        success: true,
        data: createProfile.profileImage,
        message: "Image Upload Successfully!",
      };
    } else {
      const updateprofile = await db.profile.update({
        where: {
          userId: session.user.id,
        },
        data: {
          profileImage: fileName,
        },
      });
      revalidatePath("/profile");
      return {
        success: true,
        data: updateprofile.profileImage,
        message: "Image Upload Successfully!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong, Try again!",
      err: getErrorMessage(error),
    };
  }
}
// export async function getProfileImage() {
// 	const session = await auth();
// 	if (!session || !session.user || session.user.role !== "user") {
// 		redirect("/?msg='sign-in first' ");
// 	}
// 	try {
// 		const profile = await db.profile.findUnique({
// 			where:{userId:session.user.id}
// 		});
// 		if(profile){
// 			return {
// 				success: true,
// 				data: profile.profileImage,
// 				message: "Successfully!",
// 			};
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		return {
// 			success: false,
// 			message: "Something went wrong, Try again!",
// 			err: getErrorMessage(error),
// 		};
// 	}
// }

export async function updateProfileResumeAction(fileName: string) {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "user") {
    redirect("/?msg='sign-in first' ");
  }
  if (!fileName) {
    return {
      success: false,
      message: "Something went wrong, Try again!",
    };
  }
  try {
    const profile = await db.profile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!profile) {
      const createProfile = await db.profile.create({
        data: {
          userId: session.user.id,
          resume: fileName,
        },
      });
      revalidatePath("/profile");
      return {
        success: true,
        data: createProfile.profileImage,
        message: "Resume Upload Successfully!",
      };
    } else {
      const updateprofile = await db.profile.update({
        where: {
          userId: session.user.id,
        },
        data: {
          resume: fileName,
        },
      });
      revalidatePath("/profile");
      return {
        success: true,
        data: updateprofile.profileImage,
        message: "Resume Upload Successfully!",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Something went wrong, Try again!",
      err: getErrorMessage(error),
    };
  }
}
