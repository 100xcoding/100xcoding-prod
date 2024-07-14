import { Logo } from "@/components/logo";
import { ProfileMenu } from "@/components/profile-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const CodeEditorHeader = ({
  descriptionRef,
  previewRef,
  consoleRef,
}: any) => {
  return (
    <nav className="row-start-1 row-end-2 px-4 pt-3 h-16 bg-dark-300 ">
      <div className="flex justify-between items-center w-full">
        <Link
          href="/"
          className="text-white flex items-center space-x-1 uppercase text-center font-bold text-lg"
          aria-label="FrontendPro logo"
          title="FrontendPro homepage"
        >
          <Logo />
        </Link>
        <div className="flex items-center  space-x-4">
          <Button
            asChild
            className="border border-green-500 rounded px-6 "
            variant={"outline"}
          >
            <Link href={"/challenges"}>Exit</Link>
          </Button>
          <ProfileMenu />
        </div>
      </div>
    </nav>
  );
};
