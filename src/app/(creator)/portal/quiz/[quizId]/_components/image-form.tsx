"use client";
import { createUploadUrlAction } from "@/actions/file-upload-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  appendDateToFileName,
  checkFileSize,
  cn,
  getImageUrl,
  validateFileType,
} from "@/lib/utils";
import { useCreatorQuizById } from "@/services/queries";
import { Quiz } from "@prisma/client";
import { Pencil } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { updateQuizImageAction } from "../../_actions";
interface ImageFormProps {
  initialData: Quiz;
  quizId: string;
}
export const ImageForm = ({ initialData, quizId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { refreshCreatorQuizData } = useCreatorQuizById(quizId);
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const defaultImage =
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80";
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      if (!validateFileType(selectedFile, allowedTypes)) {
        toast.error(
          "Invalid file type. Only JPEG, PNG, and JPG files are allowed.",
        );
        return;
      }
      if (!checkFileSize(selectedFile.size, 2)) {
        toast.error("Maximum size allowed 2 MB");
        return;
      }
      handleImageUpload(selectedFile);
    }
  };
  const handleImageUpload = async (profile: File) => {
    const originalFileName = profile.name;
    const fileNameWithDate = appendDateToFileName(originalFileName);
    // Create a new File object with the modified name
    const modifiedFile = new File([profile], fileNameWithDate, {
      type: profile.type,
    });

    const uploadUrl = await createUploadUrlAction(
      fileNameWithDate,
      profile.type,
    );
    const response = await fetch(uploadUrl, {
      method: "PUT",
      body: modifiedFile,
    });
    if (response.ok && response.status === 200) {
      // console.log("CLOUD-RES", response);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      const result = await updateQuizImageAction(fileNameWithDate, quizId);
      if (result.success) {
        toast.success(result?.message);
        refreshCreatorQuizData();
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error("Something went wrong, Try again!");
    }
  };
  return (
    <div className="mt-6  portal-form-box p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <AspectRatio ratio={16 / 9} className="bg-muted">
          <Image
            src={
              initialData?.image
                ? getImageUrl(initialData?.image)
                : defaultImage
            }
            alt="Photo by Drew Beamer"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      )}
      {isEditing && (
        <div className="h-[300px] dark:bg-muted-foreground w-full rounded-md aspect-video  flex mx-auto justify-center items-center">
          <Label
            htmlFor="image"
            className="flex items-center justify-center h-full "
          >
            <Input
              type="file"
              id="image"
              ref={fileInputRef}
              onChange={handleProfileImageChange}
              className="hidden"
            />
            <Button asChild>
              <span>Upload Image</span>
            </Button>
          </Label>
        </div>
      )}
    </div>
  );
};
