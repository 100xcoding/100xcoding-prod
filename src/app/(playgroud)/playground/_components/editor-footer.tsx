import { useSandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
const filterVisibleFiles = (visibleFiles: any, files: any) => {
  const visibleFileSet = new Set(visibleFiles);
  return Object.keys(files)
    .filter((file) => visibleFileSet.has(file))
    .reduce((obj, key) => {
      obj[key] = files[key];
      return obj;
    }, {});
};
export const EditorFooter = ({
  playground,
  isCompleted,
  isDirty,
  setIsDirty,
}: any) => {
  const { sandpack } = useSandpack();
  const { files, visibleFiles } = sandpack;
  const handleSave = async () => {
    if (!isDirty) return;
    const data = filterVisibleFiles(visibleFiles, files);
    const updatedData = {
      files: data,
    };
    console.log(updatedData);
    const datab: string = updatedData?.files["/index.html"]?.code!;
    console.log("FILES", datab);
    if (playground) {
      // await updatePlayground(playground?.id, updatedData);
      console.log(playground);
    } else {
      console.log(updatedData);
      // await addSubCollectionDocumentWithCustomID(updatedData, "vanilla"); // TODO: change to dynamic
    }
    setIsDirty(false);
  };
  const handleSubmit = async () => {
    const updatedData = {
      completed: !isCompleted,
    };
    try {
      if (isDirty) {
        // await handleSave();
      }
      // await updateSolution(id, updatedData);
      console.log(updatedData);
      setIsDirty(false);
      // if (!solutionResponse.error && !isCompleted) {
      // 	router.push({
      // 		pathname: `/frontend-coding-challenges/${slug}/solutions/${id}`,
      // 		query: { submit: true },
      // 	});
      // }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 left-0 right-0">
      <div className="flex justify-end bg-gray-800 h-16 p-3 border-t border-gray-600">
        <Button
          className="font-semibold mr-2"
          variant="secondary"
          size="lg"
          onClick={handleSave}
          // loading={playgroundResponse.isPending}
        >
          Save
        </Button>
        <Button
          className="font-semibold"
          // variant="primary"
          size="sm"
          onClick={handleSubmit}
          // loading={solutionResponse.isPending}
        >
          {/* {isCompleted ? (
						<>
							{!solutionResponse.isPending && (
								<Icons.Check
									size={18}
									className="mr-2 -ml-1"
								/>
							)}
							Completed
						</>
					) : (
						"Mark as complete"
					)} */}
          Mark as Complete
        </Button>
      </div>
    </div>
  );
};
