import { db } from "@/lib/db";
import { NextResponse } from "next/server";
export async function GET() {
	try {
		const categories = await db.quizCategory.findMany({});
		return NextResponse.json(categories);
	} catch (error) {
		console.log("Quiz categories -", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
