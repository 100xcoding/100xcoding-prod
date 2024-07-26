import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeEditorHeader } from "../../playground/_components/code-editor-header";
import { getChallengeSolutionBySlug } from "../_data-access";
import { ChallengeDescription } from "../../playground/_components/challenge-description";
import { CustomSandpack } from "../../playground/_components/custom-sandpack";

const SolutionPlayground = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
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
