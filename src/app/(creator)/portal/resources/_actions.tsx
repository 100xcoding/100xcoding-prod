"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { ImagePreviewResType } from "@/types";
import { resourceDataFormSchema } from "@/schema";
import { revalidatePath } from "next/cache";
const FormSchema = z.object({
  url: z.string().url(),
});
type ResourceInput = z.infer<typeof FormSchema>;
type ResourceFullData = z.infer<typeof resourceDataFormSchema>;

export async function getResourceContent(data: ResourceInput) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const result = FormSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format(), data: null };
    }
    if (result.success) {
      const final: ImagePreviewResType = (await getLinkPreview(data?.url, {
        imagesPropertyType: "og",
        followRedirects: "follow",
      })) as ImagePreviewResType;
      // console.log(final);
      return {
        success: true,
        message: "Data fetched Successfully!",
        finalData: {
          title: final?.title!,
          url: final?.url,
          description: final?.description!,
          imageUrl: final.images[0],
        },
      };
    }
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
      data: null,
    };
  }
}
export async function getResourceType() {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const data = await db.resourceType.findMany({});
    return {
      success: true,
      message: "Quiz title updated Successfully!",
      data,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
      data: null,
    };
  }
}
export async function addResource(data: ResourceFullData) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const isCreator = session?.user?.role === "creator";
    const result = resourceDataFormSchema.safeParse(data);
    if (result.error) {
      return { success: false, error: result.error.format(), data: null };
    }
    if (result.success) {
      const finalTags = result.data.resourceTags.toLowerCase().split(",");
      // Find or create tags by name
      const tags = await Promise.all(
        finalTags.map(async (tagName) => {
          let tag = await db.resourceTag.findUnique({
            where: { name: tagName },
          });
          if (!tag) {
            tag = await db.resourceTag.create({
              data: { name: tagName },
            });
          }
          return tag;
        }),
      );
      await db.resource.create({
        data: {
          title: result?.data.title,
          description: result.data.description,
          imageUrl: result.data.imageUrl,
          creatorId: session?.user?.id,
          resourceTypeId: result.data.resourceType,
          resourceLanguageId: result.data.resourceLanguage,
          url: result.data.url,
          isPublish: isCreator ? true : false,
          resourceTag: {
            create: tags.map((tag) => ({
              resourceTag: {
                connect: { id: tag.id },
              },
            })),
          },
        },
      });
      return {
        success: true,
        message: "Resource added Successfully!",
        data,
      };
    }
    // const data = await db.resourceType.findMany({});

    // console.log(data);
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
      data: null,
    };
  }
}
export async function getResources() {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    const resources = await db.resource.findMany({});
    return {
      success: true,
      message: "Data fetched Successfully!",
      resources,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
      data: null,
    };
  }
}
export async function deleteResource(id: string) {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "creator") {
      redirect("/?msg='sign-in first' ");
    }
    await db.resource.delete({
      where: {
        id: id,
        creatorId: session?.user?.id,
      },
    });
    revalidatePath("/portal/resources");
    return {
      success: true,
      message: "Resource Deleted Successfully!",
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
      data: null,
    };
  }
}
