import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { slug } = params;
    const challenge = await db.challenge.findUnique({
      where: {
        slug: slug,
        publish: true,
      },
      include: {
        challengeCategory: true,
      },
    });
    // console.log("QUIZ-API ", quiz);
    return NextResponse.json(challenge);
  } catch (error) {
    console.log("Challenge By Slug-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
