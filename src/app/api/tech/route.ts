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
    if (session?.user?.role !== "creator") {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    // const user = session?.user;

    const tech = await db.challengeTech.findMany({});

    return NextResponse.json(tech);
  } catch (error) {
    // console.log("categories -", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
