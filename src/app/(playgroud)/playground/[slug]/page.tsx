"use client";
import { useRef } from "react";
import { CodeEditorHeader } from "../_components/code-editor-header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ChallengeDescription } from "../_components/challenge-description";
import {
  useChallengeBySlug,
  useChallengePublishSolutionBySlug,
  useChallengeUnpublishSolutionBySlug,
} from "@/services/queries";
import { CustomSandpack } from "../_components/custom-sandpack";
import { redirect, useSearchParams } from "next/navigation";

const PlaygroudSlug = ({ params: { slug } }: { params: { slug: string } }) => {
  const searchParams = useSearchParams();
  const solutionParams = searchParams.get("solution");
  const { data } = useChallengeBySlug(slug);
  const { data: solutionData } = useChallengeUnpublishSolutionBySlug(slug);
  const { data: solution } = useChallengePublishSolutionBySlug(slug);
  const descriptionRef = useRef(null);
  const previewRef = useRef(null);
  const consoleRef = useRef(null);
  if (!solutionParams) {
    redirect("/");
  }
  if (!solution) {
    return <div>not found</div>;
  }
  return (
    <section className=" bg-dark-400 text-white">
      <div className="relative grid grid-rows-[50px_minmax(0,_1fr)] grid-cols-1 gap-4 h-screen xxl:max-w-screen-xxl mx-auto">
        <CodeEditorHeader
          descriptionRef={descriptionRef}
          previewRef={previewRef}
          consoleRef={consoleRef}
        />
        <ResizablePanelGroup
          className="flex h-full justify-between row-start-2 row-end-3"
          direction="horizontal"
        >
          <ResizablePanel
            collapsible
            defaultSize={25}
            className="w-80 border-t border-green-500"
            ref={descriptionRef}
          >
            <ChallengeDescription
              image={data?.image}
              description={data?.description}
              title={data?.title}
              about={data?.about}
              resource={data?.resource}
            />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel
            defaultSize={75}
            className="row-start-2 row-end-3 flex-1"
          >
            <CustomSandpack
              previewRef={previewRef}
              consoleRef={consoleRef}
              solution={solution}
              playground={solutionData}
              slug={slug}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </section>
  );
};

export default PlaygroudSlug;
