import { signin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
export function SignIn({ className = "" }) {
  return (
    <form action={signin}>
      <Button
        type="submit"
        variant={"secondary"}
        className={`border-none rounded-full text-sm uppercase font-semibold tracking-wider font-openSans flex gap-2 ${className}`}
      >
        <span className="font-poppins">Log in with GitHub</span>
        <span>
          <FaGithub className="text-2xl" />
        </span>
      </Button>
    </form>
  );
}
