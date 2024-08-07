import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { CommentForm } from "./comment-form";
import { getErrorMessage } from "@/lib/utils";
import { db } from "@/lib/db";
async function getComment(id: string) {
  try {
    const comment = await db.comment.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            username: true,
            image: true,
          },
        },
      },
    });
    return {
      success: true,
      comment,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
export const CommentEdit = async ({
  slug,
  id,
}: {
  slug: string;
  id: string;
}) => {
  const { comment } = await getComment(id);
  // console.log(comment);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          aria-label="edit"
          variant="outline"
          className="bg-blue-600 border-none text-blue-400"
          size={"sm"}
        >
          <Pencil size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dark-200 text-white border-none">
        <DialogHeader>
          <DialogTitle>Edit Comment</DialogTitle>
        </DialogHeader>
        <CommentForm slug={slug} initialData={comment} edit={true} />
      </DialogContent>
    </Dialog>
  );
};
