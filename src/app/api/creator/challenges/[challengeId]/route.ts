import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(
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
    });

    return NextResponse.json(challenge);
  } catch (error) {
    // console.log("Challenge by id-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
