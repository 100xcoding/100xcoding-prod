import { auth } from "@/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET(
  req: Request,
  { params }: { params: { quizId: string } },
) {
  const { quizId } = params;
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

    const quiz = await db.quiz.findUnique({
      where: {
        id: quizId,
        creatorId: user.id,
      },
      include: {
        questions: true,
      },
    });
    // console.log("QUIZ-API ", quiz);
    return NextResponse.json(quiz);
  } catch (error) {
    console.log("Quiz by id-", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
