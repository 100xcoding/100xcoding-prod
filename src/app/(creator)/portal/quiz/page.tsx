import { auth } from "@/auth";
import { QuizPageForm } from "./_components/quiz-page";
import { redirect } from "next/navigation";

const QuizesPage = async () => {
  const session = await auth();
  if (session?.user?.role !== "creator") {
    redirect("/");
  }
  return <QuizPageForm />;
};

export default QuizesPage;
