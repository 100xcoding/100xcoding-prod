import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function PUT(
  req: Request,
  { params }: { params: { quizId: string } },
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
    const { list } = await req.json();
    const { quizId } = params;
    const ownQuiz = await db.quiz.findUnique({
      where: {
        id: quizId,
        creatorId: user?.id,
      },
    });
    if (!ownQuiz) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    for (let item of list) {
      await db.quizQuestion.update({
        where: { id: item.id },
        data: { position: item.position },
      });
    }
    return NextResponse.json("Success", { status: 200 });
  } catch (error) {
    // console.log("Reorder quiz question-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
