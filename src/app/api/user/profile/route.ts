import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = session?.user;

    const profile = await db.user.findUnique({
      where: {
        id: user.id,
      },
      include: {
        profile: true,
        socialLink: true,
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    // console.log("PROFILE-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
