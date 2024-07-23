import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function PATCH(
  req: Request,
  { params }: { params: { challengeId: string } },
) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (session?.user?.role !== "creator") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = session?.user;
    const { challengeId } = params;
    const challenge = await db.challenge.findUnique({
      where: {
        id: challengeId,
        creatorId: user.id,
      },
      include: {
        challengeCategory: true,
      },
    });
    if (!challenge) {
      return new NextResponse("Not found", { status: 404 });
    }
    if (
      !challenge.title ||
      !challenge.description ||
      !challenge.challengeCategory ||
      !challenge.figmaDesktop ||
      !challenge.figmaMobile ||
      !challenge.image ||
      !challenge.about
    ) {
      return new NextResponse("Missing required fields", { status: 401 });
    }
    const publishedChallenge = await db.challenge.update({
      where: {
        id: challengeId,
        creatorId: user.id,
      },
      data: {
        publish: true,
      },
    });
    return NextResponse.json(publishedChallenge);
  } catch (error) {
    // console.log("Challenge publish", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
