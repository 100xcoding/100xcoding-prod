import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { quizId: string; questionId: string } },
) {
  const { quizId, questionId } = params;
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

    const question = await db.quizQuestion.findUnique({
      where: {
        id: questionId,
        creatorId: user.id,
        quizId: quizId,
      },
      include: {
        options: true,
      },
    });
    // console.log("QUIZ-API ", quiz);
    return NextResponse.json(question);
  } catch (error) {
    console.log("Question  by id-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
