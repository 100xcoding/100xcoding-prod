import { useSandpack } from "@codesandbox/sandpack-react";
import { Button } from "@/components/ui/button";
import {
  createChallengeSolution,
  publishChallengeSolution,
  updateChallengeSolution,
} from "../_actions";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "@/components/loader2";
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
  const [loading, setLoading] = useState(false);
  const handleSave = async () => {
    if (!isDirty) return;
    setLoading(true);
    const data = filterVisibleFiles(visibleFiles, files);
    const updatedData = {
      files: data,
    };

    if (playground || isCompleted) {
      // Update the data only
      const result = await updateChallengeSolution(updatedData, slug);
      // console.log(result);
      if (result?.success) {
        toast.info("updated Successfully, now you can also publish this");
        setIsDirty(false);
      } else {
        toast.error(result?.err);
        setIsDirty(true);
      }
    } else {
      // create solution record
      const result = await createChallengeSolution(updatedData, slug);
      if (result?.success) {
        toast.info("Saved Successfully, now you can also publish this");
        setIsDirty(false);
      } else {
        setIsDirty(true);
        toast.error(result?.message);
        toast.error(result?.err);
      }
    }
    setLoading(false);
  };
  const handleSubmit = async () => {
    const updatedData = {
      completed: !isCompleted,
    };
    try {
      setLoading(true);
      if (isDirty) {
        await handleSave();
      }
      const result = await publishChallengeSolution(slug);
      if (result?.success) {
        toast.success("Challenge published successfully!");
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
      setLoading(false);
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
          disabled={loading}
        >
          {loading ? <Loader2 /> : "Save"}
        </Button>
        <Button
          aria-label="save & publish"
          className="font-semibold capitalize"
          disabled={loading || isCompleted}
          onClick={handleSubmit}
        >
          {loading ? <Loader2 /> : "Save & Publish"}
        </Button>
      </div>
    </div>
  );
};
