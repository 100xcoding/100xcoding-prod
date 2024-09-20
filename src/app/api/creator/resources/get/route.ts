import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getLinkPreview, getPreviewFromContent } from "link-preview-js";

export async function POST(req: Request) {
  try {
    // const session = await auth();
    // if (!session) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    // if (!session?.user) {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    // if (session?.user?.role !== "creator") {
    //   return new NextResponse("Unauthorized", { status: 401 });
    // }
    // const user = session?.user;

    const { url } = await req.json();
    const data = await getLinkPreview(url, {
      imagesPropertyType: "og",
      followRedirects: "follow",
      headers: {
        "user-agent": "googlebot",
        // Ensure no cache for the API request
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    // console.log("quizes-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
