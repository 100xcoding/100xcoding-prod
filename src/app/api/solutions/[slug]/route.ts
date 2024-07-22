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
    const solution = await db.challengeSolution.findUnique({
      where: {
        slug: slug,
        status: true,
      },
    });
    // console.log("QUIZ-API ", quiz);
    return NextResponse.json(solution);
  } catch (error) {
    // console.log("Challenge solution By Slug-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
