import { signin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
export function SignIn({ className = "" }) {
  return (
    <form action={signin}>
      <Button
        type="submit"
        variant={"secondary"}
        className={`border-none rounded-full text-sm uppercase font-semibold tracking-wider font-openSans flex gap-2 ${className} inline-flex items-center justify-center font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-br from-violet-700 to-pink-700 via-purple-700 w-fit text-base uppercase hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-lg active:from-violet-800 active:via-purple-800 active:to-pink-800 active:scale-95 transform transition-transform h-10 px-8 py-6 rounded-full`}
      >
        <span className="font-poppins">Log in with GitHub</span>
        <span>
          <FaGithub className="text-2xl" />
        </span>
      </Button>
    </form>
  );
}
