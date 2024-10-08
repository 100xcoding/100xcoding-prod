"use client";
import { Challenge } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";

import { Pencil } from "lucide-react";
import { updateChallengeResourceAction } from "../../_actions";
import { useCreatorChallengeById } from "@/services/queries";
import { toast } from "sonner";
import Editor from "@/components/react-quil-editor";
interface ResourceFormProps {
  initialData: Challenge;
  challengeId: string;
}
export const ResourceForm = ({
  initialData,
  challengeId,
}: ResourceFormProps) => {
  const [content, setContent] = useState<string>(initialData?.resource || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const { refreshCreatorChallengeData } = useCreatorChallengeById(challengeId);
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await updateChallengeResourceAction(
        content,
        challengeId,
      );
      if (response?.success) {
        setContent("");
        setIsEditing(false);
        refreshCreatorChallengeData();
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    },
    [content, challengeId, refreshCreatorChallengeData],
  );

  useEffect(() => {
    setContent(initialData?.resource || "");
  }, [initialData]);
  return (
    <div className="mt-6  portal-form-box p-4">
      <div className="font-medium flex items-center justify-between tracking-wide">
        Resources the Challenge
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="cursor-pointer"
          aria-label="edit resources"
        >
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit resources
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <div className="prose prose-a:text-green-500 prose-headings:text-white text-white ">
            {parse(initialData?.resource || "")}
          </div>
        </>
      )}
      {isEditing && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Editor value={content} setValue={setContent} />
          <Button type="submit" aria-label="save">
            Save
          </Button>
        </form>
      )}
    </div>
  );
};
