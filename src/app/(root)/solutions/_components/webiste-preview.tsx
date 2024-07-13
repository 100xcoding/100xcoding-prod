import { FILES } from "@/constants";
import {
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";

export const WebsitePreview = ({ solution }: any) => {
  // console.log(solution);
  const SolutionFiles = {
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
  return (
    <SandpackProvider
      template="vanilla"
      files={SolutionFiles ? SolutionFiles : FILES.demo}
      options={{
        activeFile: "index.html",
      }}
      theme={{
        colors: {
          surface1: "#1F2937",
          surface2: "#4B5563",
          surface3: "#3b3b4f",
          accent: "#A855F7",
        },
        font: {
          size: "14px",
        },
      }}
    >
      <SandpackLayout
        style={{
          border: "none",
          borderRadius: "0",
        }}
      >
        <SandpackPreview
          style={{
            height: "100vh",
            overflowY: "scroll",
          }}
          showOpenInCodeSandbox={false}
          showRefreshButton={false}
        />
      </SandpackLayout>
    </SandpackProvider>
  );
};
