"use client";
import { addCommentLike } from "../_actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
export const CommentLike = ({
  commentId,
  count,
  userHasLiked,
}: {
  commentId: string;
  count: number;
  userHasLiked: boolean;
}) => {
  const router = useRouter();
  const handleLike = async () => {
    const result = await addCommentLike(commentId);
    if (result?.success) {
      router.refresh();
      toast.success(result?.message);
    } else {
      toast.error(result?.err);
    }
  };
  return (
    <button
      onClick={handleLike}
      className="flex items-center gap-1"
      aria-label="like"
    >
      {userHasLiked ? (
        <AiFillLike size={30} className="text-green-500" />
      ) : (
        <AiOutlineLike size={30} />
      )}
      <span className="text-xl font-semibold">{count}</span>
    </button>
  );
};
