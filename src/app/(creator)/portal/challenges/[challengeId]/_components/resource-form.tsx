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
    <div className="mt-6  dark:bg-muted rounded-md p-4">
      <div className="font-medium flex items-center justify-between tracking-wide">
        Resources the Challenge
        <Button onClick={toggleEdit} variant="ghost" className="cursor-pointer">
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
          <div className="prose dark:prose-h1:text-primary-foreground">
            {parse(initialData?.resource || "")}
          </div>
        </>
      )}
      {isEditing && (
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Editor value={content} setValue={setContent} />
          <Button type="submit">Save</Button>
        </form>
      )}
    </div>
  );
};
