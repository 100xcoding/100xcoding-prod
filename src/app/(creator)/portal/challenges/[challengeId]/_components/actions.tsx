"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface ActionsProps {
  disabled?: boolean;
  challengeId: string;
  isPublished: boolean;
}
export const Actions = ({ challengeId, isPublished }: ActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        // await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.error("Published Challenge can't be unpublished");
      } else {
        await axios.patch(`/api/creator/challenges/${challengeId}/publish`);
        toast.success("Challenge published");
      }

      router.refresh();
    } catch (err) {
      // console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  // const onDelete = async () => {
  //   try {
  //     setIsLoading(true);
  //     if (!isPublished) {
  //       await axios.delete(`/api/courses/${courseId}`);
  //       toast.success("Course deleted");
  //       router.refresh();
  //       router.push(`/creator/courses`);
  //     } else {
  //       toast.error("Publish Course Can't be Deleted!");
  //     }
  //   } catch {
  //     toast.error("Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <div className="flex items-center gap-x-2">
      <Button asChild variant={"link"} aria-label="Check Page View">
        <Link
          aria-label="Check Page View"
          href={`/creator/draft/${challengeId}`}
        >
          Check Page View
        </Link>
      </Button>
      <Button
        onClick={onClick}
        disabled={isLoading || isPublished}
        variant="secondary"
        size="sm"
        className="bg-green-600 text-green-400 tracking-wider text-base "
        aria-label="publish/unpublish"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      {/* <ConfirmModal onConfirm={onDelete}>
          <Button size="sm" disabled={isLoading}>
            <Trash className="h-4 w-4" />
          </Button>
        </ConfirmModal> */}
    </div>
  );
};
