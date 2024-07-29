import { auth } from "@/auth";
import { LoginForm } from "./_components/login-form";
import { redirect } from "next/navigation";
const LoginPage = async () => {
  const session = await auth();
  if (session?.user) {
    redirect("/");
  }
  return <LoginForm />;
};

export default LoginPage;
