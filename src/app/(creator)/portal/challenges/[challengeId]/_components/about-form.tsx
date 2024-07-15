"use client";
import { Challenge } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import parse from "html-react-parser";

import { Pencil } from "lucide-react";
import { updateChallengeAboutAction } from "../../_actions";
import { useCreatorChallengeById } from "@/services/queries";
import { toast } from "sonner";
import Editor from "@/components/react-quil-editor";
interface AboutFormProps {
  initialData: Challenge;
  challengeId: string;
}
export const AboutForm = ({ initialData, challengeId }: AboutFormProps) => {
  const [content, setContent] = useState<string>(initialData?.about || "");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const { refreshCreatorChallengeData } = useCreatorChallengeById(challengeId);
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await updateChallengeAboutAction(content, challengeId);
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
    setContent(initialData?.about || "");
  }, [initialData]);
  return (
    <div className="mt-6 portal-form-box p-4">
      <div className="font-medium flex items-center justify-between tracking-wide">
        About the Challenge
        <Button onClick={toggleEdit} variant="ghost" className="cursor-pointer">
          {isEditing ? (
            "Cancel"
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit about
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <div className="prose dark:prose-h1:text-primary-foreground">
            {parse(initialData?.about || "")}
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
