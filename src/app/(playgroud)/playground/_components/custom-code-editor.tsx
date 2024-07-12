"use client";
import Editor from "@monaco-editor/react";
import { emmetCSS, emmetHTML } from "emmet-monaco-es";
import { SandpackStack, useSandpack } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import { CustomTabs } from "./custom-tabs";
import { EditorFooter } from "./editor-footer";
export const getLanguageOfFile = (filePath: any) => {
  const extensionDotIndex = filePath.lastIndexOf(".");
  const extension = filePath.slice(extensionDotIndex + 1);

  switch (extension) {
    case "js":
    case "jsx":
    case "ts":
    case "tsx":
      return "javascript";
    case "vue":
    case "html":
      return "html";
    case "css":
    case "scss":
    case "less":
      return "css";
    default:
      return "";
  }
};
export const CustomCodeEditor = ({ playground, solution }: any) => {
  const [isDirty, setIsDirty] = useState(false);
  const [activeFile, setActiveFile] = useState("/index.html");
  const { sandpack } = useSandpack();
  const { files, updateFile } = sandpack;
  const language = getLanguageOfFile(activeFile);
  const handleEditorDidMount = (editor: any, monaco: any) => {
    emmetHTML(monaco);
    emmetCSS(monaco);
  };
  const handleBeforeUnload = (event: any) => {
    if (isDirty) {
      event.preventDefault();
      event.returnValue = "";
    }
  };
  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDirty]);
  return (
    <div className="h-full flex flex-col">
      <SandpackStack
        style={{
          height: "100%",
        }}
      >
        <CustomTabs activeFile={activeFile} setActiveFile={setActiveFile} />
        <div className="bg-[#1e1e1e] h-full relative">
          <Editor
            width="100%"
            height="100%"
            language={language}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            key={activeFile}
            defaultValue={files[activeFile]?.code || ""}
            loading={<div className="text-[#1e1e1e]">Loading...</div>}
            onChange={(value) => {
              updateFile(activeFile, value || "");
              setIsDirty(true);
            }}
            options={{
              minimap: {
                enabled: false,
              },
              fontSize: 14,
              readOnly: false,
            }}
          />
        </div>
        {/* {user?.uid === solution?.userID && (
					<EditorFooter
						isCompleted={solution.completed}
						playground={playground}
						isDirty={isDirty}
						setIsDirty={setIsDirty}
					/>
				)} */}
        <EditorFooter
          isCompleted={false}
          playground={playground}
          isDirty={isDirty}
          setIsDirty={setIsDirty}
        />
      </SandpackStack>
    </div>
  );
};
