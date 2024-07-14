import { useSandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import {
  createChallengeSolution,
  publishChallengeSolution,
  updateChallengeSolution,
} from "../_actions";
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
  slug,
  solution,
}: any) => {
  const { sandpack } = useSandpack();
  const { files, visibleFiles } = sandpack;
  const handleSave = async () => {
    if (!isDirty) return;
    const data = filterVisibleFiles(visibleFiles, files);
    const updatedData = {
      files: data,
    };

    if (playground) {
      // Update the data only
      const result = await updateChallengeSolution(updatedData, slug);
      console.log(result);
    } else {
      // create solution record
      console.log(updatedData);
      const result = await createChallengeSolution(updatedData, slug);
      console.log(result);
    }
    setIsDirty(false);
  };
  const handleSubmit = async () => {
    const updatedData = {
      completed: !isCompleted,
    };
    try {
      if (isDirty) {
        await handleSave();
      }
      const result = await publishChallengeSolution(slug);
      console.log(result);
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
      <div className="flex justify-end bg-dark-400 h-16 p-3 border-t border-green-500">
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
