import { Logo } from "@/components/logo";
import Link from "next/link";

export const CodeEditorHeader = ({
  descriptionRef,
  previewRef,
  consoleRef,
}: any) => {
  return (
    <nav className="row-start-1 row-end-2 px-2 py-3 bg-gray-900">
      <ul className="flex justify-between items-center">
        <Link
          href="/"
          className="text-white flex items-center space-x-1 uppercase text-center font-bold text-lg"
          aria-label="FrontendPro logo"
          title="FrontendPro homepage"
        >
          <Logo />
        </Link>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {/* <Tooltip message={"Toggle Description"}>
							<button
								className="text-gray-500 hover:text-white transition-colors"
								onClick={() => collapsePanel(descriptionRef)}
							>
								<Icons.LayoutSidebar />
							</button>
						</Tooltip> */}
            {/* <Tooltip message={"Toggle Preview"}>
							<button
								className="text-gray-500 hover:text-white transition-colors rotate-180"
								onClick={() => collapsePanel(previewRef)}
							>
								<Icons.LayoutSidebar />
							</button>
						</Tooltip> */}
            {/* <Tooltip message={"Toggle Console"}>
							<button
								className="text-gray-500 hover:text-white transition-colors -rotate-90"
								onClick={() => collapsePanel(consoleRef)}
							>
								<Icons.LayoutSidebar />
							</button>
						</Tooltip> */}
          </div>
          {/* <AvatarDropdown className="w-6 h-6 ring-indigo-600" /> */}
        </div>
      </ul>
    </nav>
  );
};
