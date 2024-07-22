import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { CommentForm } from "./comment-form";
import { getComment } from "../_data-access";
export const CommentEdit = async ({
  slug,
  id,
}: {
  slug: string;
  id: string;
}) => {
  const { comment } = await getComment(id);
  console.log(comment);
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
