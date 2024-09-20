import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.searchParams);

    const resources = await db.resource.findMany({
      where: {
        isPublish: true,
        resourceTypeId: searchParams.get("currentType"),
        resourceLanguageId: searchParams.get("language"),
        resourceTag: {
          some: {
            resourceTagId: "",
          },
        },
      },
      include: {
        resourceTag: {
          select: {
            resourceTag: {
              select: {
                name: true,
              },
            },
          },
        },
        resourceType: {
          select: {
            name: true,
          },
        },
        resourceLanguage: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json(resources);
  } catch (error) {
    // console.log("quizes-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
