import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackConsole,
  SandpackFileExplorer,
} from "@codesandbox/sandpack-react";
import { FILES } from "@/constants";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CustomCodeEditor } from "./custom-code-editor";
export const CustomSandpack = ({
  previewRef,
  consoleRef,
  solution,
  slug,
  playground,
}: any) => {
  let SolutionFiles;
  if (solution) {
    SolutionFiles = {
      "/index.html": {
        code: solution?.htmlContent!,
      },
      "/index.js": {
        code: solution?.jsContent!,
      },
      "/src/styles.css": {
        code: solution?.cssContent,
      },
    };
  } else if (playground) {
    SolutionFiles = {
      "/index.html": {
        code: playground?.htmlContent!,
      },
      "/index.js": {
        code: playground?.jsContent!,
      },
      "/src/styles.css": {
        code: playground?.cssContent,
      },
    };
  }

  return (
    <SandpackProvider
      template="vanilla"
      theme={{
        colors: {
          surface1: "#131619",
          surface2: "#4B5563",
          surface3: "#3b3b4f",
          accent: "#24AE7C",
          base: "#ffffff",
          disabled: "#858591",
          error: "#ffffff",
          errorSurface: "#3b3b4f",
        },
        font: {
          size: "14px",
        },
      }}
      files={SolutionFiles ? SolutionFiles : FILES.demo}
    >
      <SandpackLayout style={{ borderRadius: 0 }}>
        <div className="h-[calc(100vh-50px)] flex w-full gap-[1px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="h-full w-full">
              <CustomCodeEditor
                slug={slug}
                playground={playground}
                solution={solution}
              />
            </ResizablePanel>
            <ResizableHandle className="w-1 bg-dark-200 transition-colors hover:bg-gray-600" />
            <ResizablePanel
              className="border-l border-green-500"
              collapsible={true}
              ref={previewRef}
            >
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  defaultSize={50}
                  className="border-b border-green-500"
                >
                  <SandpackPreview
                    showNavigator
                    showOpenInCodeSandbox={false}
                    style={{
                      height: "100%",
                    }}
                  />
                </ResizablePanel>
                <ResizableHandle className="h-[0.25rem] bg-dark-200 transition-colors hover:bg-gray-600" />

                <ResizablePanel
                  defaultSize={30}
                  collapsible={true}
                  ref={consoleRef}
                >
                  <SandpackConsole
                    showResetConsoleButton
                    style={{
                      height: "100%",
                    }}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};
