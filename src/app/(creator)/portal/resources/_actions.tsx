"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";
import { ImagePreviewResType } from "@/types";
const FormSchema = z.object({
  url: z.string().url(),
});
type ResourceInput = z.infer<typeof FormSchema>;

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
      console.log(final);
      return {
        success: true,
        message: "Quiz title updated Successfully!",
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
