import { signin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
export function SignIn() {
  return (
    <form action={signin}>
      <Button
        type="submit"
        variant={"secondary"}
        className="w-full tracking-wide bg-dark-200 flex items-center gap-4 text-base py-6"
      >
        <FaGithub className="text-2xl" />
        Log in using GitHub
      </Button>
    </form>
  );
}
