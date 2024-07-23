import { CodeEditorHeader } from "../_components/code-editor-header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChallengeDescription } from "../_components/challenge-description";
import { CustomSandpack } from "../_components/custom-sandpack";
import { getChallenge, getUnpublishSolutionBySlug } from "../_data-access";
import { Warning } from "../_components/warning";
import { notFound } from "next/navigation";
const PlaygroudSlug = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { challenge } = await getChallenge(slug);
  const { solution } = await getUnpublishSolutionBySlug(slug);
  if (!challenge) {
    notFound();
  }
  return (
    <section className=" bg-dark-400 text-white">
      {solution?.status && (
        <Warning status={solution?.status} slug={solution?.slug} />
      )}
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
              image={challenge?.image!}
              description={challenge?.description!}
              title={challenge?.title}
              about={challenge?.about!}
              resource={challenge?.resource!}
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
              solution={null}
              playground={solution}
              slug={slug}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  );
};

export default PlaygroudSlug;
