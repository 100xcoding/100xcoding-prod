"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import {
  ChallengeAuthorSchema,
  ChallengeCategorySchema,
  ChallengeFigmaSchema,
  ChallengeShortDescriptionSchema,
  ChallengeTechSchema,
  CreateChallengeSchema,
} from "@/schema/challenge-schema";
import { redirect } from "next/navigation";
import { z } from "zod";
type ChallengeInput = z.infer<typeof CreateChallengeSchema>;
type ChallengeCategoryInput = z.infer<typeof ChallengeCategorySchema>;
type ChallengeDescriptionInput = z.infer<
  typeof ChallengeShortDescriptionSchema
>;
type ChallengeTechInput = z.infer<typeof ChallengeTechSchema>;
type ChallengeFigmaInput = z.infer<typeof ChallengeFigmaSchema>;
type ChallengeAuthorInput = z.infer<typeof ChallengeAuthorSchema>;
export async function createChallengeAction(data: ChallengeInput) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const result = CreateChallengeSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      const checkTitle = await db.challenge.findUnique({
        where: {
          slug: result?.data?.slug!,
        },
      });
      if (!checkTitle) {
        const challenge = await db.challenge.create({
          data: {
            creatorId: session.user.id,
            title: result?.data?.title,
            slug: result?.data?.slug,
            userId: session?.user.id,
          },
        });
        return { success: true, message: "Challenge created Successfully!" };
      }
      return { success: false, message: "Title already exist!" };
    }
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
  //TODO: Add Revalidate function
}
export async function updateTitleChallengeAction(
  data: ChallengeInput,
  challengeId: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const result = CreateChallengeSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      const checkTitle = await db.challenge.findUnique({
        where: {
          slug: result?.data?.slug!,
        },
      });
      if (!checkTitle) {
        const challenge = await db.challenge.update({
          where: {
            id: challengeId,
            creatorId: session.user.id,
          },
          data: {
            title: result?.data?.title,
            slug: result?.data?.slug,
          },
        });
        return {
          success: true,
          message: "Challenge title updated Successfully!",
        };
      }
      return { success: false, message: "Title already exist!" };
    }
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export async function updateChallengeCategoryAction(
  data: ChallengeCategoryInput,
  challengeId: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const result = ChallengeCategorySchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      const challenge = await db.challenge.update({
        where: {
          id: challengeId,
          creatorId: session.user.id,
        },
        data: {
          challengeCategoryId: result.data.challengeCategoryId,
        },
      });
      return {
        success: true,
        message: "Challenge category updated Successfully!",
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

export async function updateChallengeDescriptionAction(
  data: ChallengeDescriptionInput,
  challengeId: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const result = ChallengeShortDescriptionSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      const challenge = await db.challenge.update({
        where: {
          id: challengeId,
          creatorId: session.user.id,
        },
        data: {
          description: result.data.description,
        },
      });
      return {
        success: true,
        message: "Challenge description updated Successfully!",
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
export async function updateChallengeAboutAction(
  about: string,
  challengeId: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    if (!about || about.length <= 0) {
      return { success: false, message: "Enter the About!" };
    }
    const challenge = await db.challenge.update({
      where: {
        id: challengeId,
        creatorId: session.user.id,
      },
      data: {
        about: about,
      },
    });
    return { success: true, message: "Challenge about updated Successfully!" };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}

export async function updateChallengeTechAction(
  data: ChallengeTechInput,
  challengeId: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const result = ChallengeTechSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      const challenge = await db.challenge.update({
        where: {
          id: challengeId,
          creatorId: session.user.id,
        },
        data: {
          challengeTechId: result.data.challengeTechId,
        },
      });
      return {
        success: true,
        message: "Challenge tech stack updated Successfully!",
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
export async function updateChallengeFigmaAction(
  data: ChallengeFigmaInput,
  challengeId: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const result = ChallengeFigmaSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      const challenge = await db.challenge.update({
        where: {
          id: challengeId,
          creatorId: session.user.id,
        },
        data: {
          figmaDesktop: result.data.figmaDesktop,
          figmaMobile: result.data.figmaMobile,
        },
      });
      return {
        success: true,
        message: "Challenge figma URL updated Successfully!",
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
export async function updateChallengeAuthorAction(
  data: ChallengeAuthorInput,
  challengeId: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const result = ChallengeAuthorSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format() };
    }
    if (result.success) {
      const challenge = await db.challenge.update({
        where: {
          id: challengeId,
          creatorId: session.user.id,
        },
        data: {
          authorName: result.data.authorName,
          authorProfile: result.data.authorProfile,
        },
      });
      return {
        success: true,
        message: "Challenge author updated Successfully!",
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
export async function updateChallengeImageAction(
  fileName: string,
  challengeId: string,
) {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "creator") {
    redirect("/?msg='sign-in first' ");
  }
  if (!fileName) {
    return {
      success: false,
      message: "Something went wrong, Try again!",
    };
  }
  try {
    const updateprofile = await db.challenge.update({
      where: {
        creatorId: session.user.id,
        id: challengeId,
      },
      data: {
        image: fileName,
      },
    });
    return {
      success: true,
      message: "Image Upload Successfully!",
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
export async function updateChallengeResourceAction(
  resource: string,
  challengeId: string,
) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    if (!resource || resource.length <= 0) {
      return { success: false, message: "Enter the About!" };
    }
    const challenge = await db.challenge.update({
      where: {
        id: challengeId,
        creatorId: session.user.id,
      },
      data: {
        resource: resource,
      },
    });
    return {
      success: true,
      message: "Challenge resources updated Successfully!",
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
