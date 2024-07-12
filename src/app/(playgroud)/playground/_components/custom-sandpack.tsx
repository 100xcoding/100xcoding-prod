import React from "react";
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
export const CustomSandpack = ({ previewRef, consoleRef, solution }: any) => {
  return (
    <SandpackProvider
      template="vanilla"
      theme={{
        colors: {
          surface1: "#1F2937",
          surface2: "#4B5563",
          surface3: "#3b3b4f",
          accent: "#A855F7",
          base: "#ffffff",
          disabled: "#858591",
          error: "#ffffff",
          errorSurface: "#3b3b4f",
        },
        font: {
          size: "14px",
        },
      }}
      files={FILES.demo}
    >
      <SandpackLayout style={{ borderRadius: 0 }}>
        <div className="h-[calc(100vh-50px)] flex w-full gap-[1px]">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel className="h-full w-full">
              <CustomCodeEditor />
              {/* <SandpackCodeEditor
                                showTabs
                                showLineNumbers={false}
                                showInlineErrors
                                wrapContent
                                closableTabs
                            /> */}
            </ResizablePanel>
            <ResizableHandle className="w-1 bg-gray-800 transition-colors hover:bg-gray-600" />
            <ResizablePanel
              className="border-l border-gray-600"
              collapsible={true}
              ref={previewRef}
            >
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  defaultSize={50}
                  className="border-b border-gray-600"
                >
                  <SandpackPreview
                    showNavigator
                    showOpenInCodeSandbox={false}
                    style={{
                      height: "100%",
                    }}
                  />
                </ResizablePanel>
                <ResizableHandle className="h-[0.25rem] bg-gray-800 transition-colors hover:bg-gray-600" />

                <ResizablePanel
                  defaultSize={30}
                  collapsible={true}
                  ref={consoleRef}
                >
                  <SandpackConsole
                    // showResetConsoleButton
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
