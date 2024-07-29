import { auth } from "@/auth";
import { ChallengeTable } from "./_components/challenge-table";
import { redirect } from "next/navigation";

const ChallengePage = async () => {
  const session = await auth();
  if (session?.user?.role !== "creator") {
    redirect("/");
  }
  return <ChallengeTable />;
};

export default ChallengePage;
