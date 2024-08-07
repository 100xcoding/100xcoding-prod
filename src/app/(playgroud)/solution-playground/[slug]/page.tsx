import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditorHeader } from "../../playground/_components/code-editor-header";
import { ChallengeDescription } from "../../playground/_components/challenge-description";
import { CustomSandpack } from "../../playground/_components/custom-sandpack";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
async function getChallengeSolutionBySlug(slug: string) {
  try {
    const solution = await db.challengeSolution.findUnique({
      where: {
        slug,
        status: true,
      },
      include: {
        challenge: true,
      },
    });
    return {
      success: true,
      solution,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
const SolutionPlayground = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const session = await auth();
  if (session?.user) {
    redirect("/login?msg=Login First");
  }
  const { solution } = await getChallengeSolutionBySlug(slug);
  // console.log(solution);
  return (
    <section className=" bg-dark-400 text-white">
      <div className="relative grid grid-rows-[50px_minmax(0,_1fr)] grid-cols-1 gap-4 h-screen xxl:max-w-screen-xxl mx-auto">
        <CodeEditorHeader
          descriptionRef={null}
          previewRef={null}
          consoleRef={null}
        />
        <ResizablePanelGroup
          className="flex h-full justify-between row-start-2 row-end-3"
          direction="horizontal"
        >
          <ResizablePanel
            collapsible
            defaultSize={25}
            className="w-80 border-t border-green-500"
            ref={null}
          >
            <ChallengeDescription
              image={solution?.challenge?.image!}
              description={solution?.challenge?.description!}
              title={solution?.challenge?.title!}
              about={solution?.challenge?.about!}
              resource={solution?.challenge?.resource!}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={75}
            className="row-start-2 row-end-3 flex-1"
          >
            <CustomSandpack
              previewRef={null}
              consoleRef={null}
              solution={solution}
              playground={null}
              slug={slug}
              isSolution={true}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  );
};

export default SolutionPlayground;
