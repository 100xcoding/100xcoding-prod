"use client";
import { useSandpack } from "@codesandbox/sandpack-react";

const getFileName = (filePath: any) => {
  const lastIndexOfSlash = filePath.lastIndexOf("/");
  return filePath.slice(lastIndexOfSlash + 1);
};
export const CustomTabs = ({ activeFile, setActiveFile }: any) => {
  const { sandpack } = useSandpack();
  const { visibleFiles } = sandpack;
  console.log(visibleFiles);
  return (
    <div className="flex space-x-3 p-2 border-b border-gray-600 overflow-y-auto">
      {visibleFiles.map((name) => (
        <button
          aria-label="get files"
          key={name}
          className={` ${name === activeFile ? "text-purple-500" : "text-white"}`}
          onClick={() => setActiveFile(name)}
          data-active={name === activeFile}
        >
          {getFileName(name)}
        </button>
      ))}
    </div>
  );
};
