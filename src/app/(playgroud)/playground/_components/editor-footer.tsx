import { useSandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import {
  createChallengeSolution,
  publishChallengeSolution,
  updateChallengeSolution,
} from "../_actions";
import { toast } from "sonner";
interface Files {
  [key: string]: any; // You can replace `any` with a more specific type if you know it
}
const filterVisibleFiles = (visibleFiles: string[], files: Files): Files => {
  const visibleFileSet = new Set(visibleFiles);
  return Object.keys(files)
    .filter((file) => visibleFileSet.has(file))
    .reduce<Files>((obj, key) => {
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
      // console.log(result);
      if (result?.success) {
        toast.success("Saved Successfully!");
        setIsDirty(false);
      } else {
        toast.error(result?.err);
        setIsDirty(true);
      }
    } else {
      // create solution record
      const result = await createChallengeSolution(updatedData, slug);
      if (result?.success) {
        toast.success("Saved Successfully!");
        setIsDirty(false);
      } else {
        setIsDirty(true);
        toast.error(result?.message);
        toast.error(result?.err);
      }
    }
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
      if (result?.success) {
        toast.success("Challenge completed successfully!");
      } else {
        toast.error(result?.err);
        toast.error(result?.message);
      }
      // console.log(result);
      setIsDirty(false);
      // if (!solutionResponse.error && !isCompleted) {
      // 	router.push({
      // 		pathname: `/frontend-coding-challenges/${slug}/solutions/${id}`,
      // 		query: { submit: true },
      // 	});
      // }
    } catch (error) {
      // console.log(error);
    }
  };
  return (
    <div className="absolute bottom-0 left-0 right-0   z-50">
      <div className="flex justify-end bg-dark-400 h-[5rem] p-3 border-t border-green-500">
        <Button
          aria-label="save"
          className="font-semibold mr-2"
          variant="outline"
          size="lg"
          onClick={handleSave}
          // loading={playgroundResponse.isPending}
        >
          Save
        </Button>
        <Button
          aria-label="mark as complete"
          className="font-semibold"
          // variant="primary"

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
