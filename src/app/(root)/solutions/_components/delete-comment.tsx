"use client";

import { toast } from "sonner";
import { deleteSolutionFeedback } from "../_actions";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const DeleteComment = ({ id }: { id: string }) => {
  const router = useRouter();
  const deleteComment = async (id: string) => {
    const result = await deleteSolutionFeedback(id!);
    if (result?.success) {
      router.refresh();
      toast.success(result?.message);
    } else {
      toast.error(result?.err);
    }
  };
  return (
    <Button
      aria-label="delete comment"
      onClick={() => deleteComment(id)}
      className="bg-red-600 text-red-500"
      variant={"secondary"}
      size={"sm"}
    >
      <Trash2 size={18} />
    </Button>
  );
};
