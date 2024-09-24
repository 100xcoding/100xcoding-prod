import { auth } from "@/auth";
import { LoginForm } from "./_components/login-form";
import { redirect } from "next/navigation";
const LoginPage = async ({
  searchParams,
}: {
  searchParams: { redirect?: string };
}) => {
  const params = searchParams;
  const session = await auth();

  if (session?.user) {
    redirect(`${params.redirect ?? "/"}`);
  }
  return <LoginForm />;
};

export default LoginPage;
