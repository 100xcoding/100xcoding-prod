import { Card, CardHeader } from "@/components/ui/card";
import { getComments } from "../_data-access";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Trash2 } from "lucide-react";
import { CommentEdit } from "./comment-edit";
import { auth } from "@/auth";
import { DeleteComment } from "./delete-comment";

export const CommentList = async ({ slug }: { slug: string }) => {
  const { comments } = await getComments(slug);
  const session = await auth();
  console.log(comments);

  return (
    <div>
      {comments &&
        comments.map((comment) => (
          <Card
            key={comment.id}
            className="bg-cardLg border-none bg-cover shadow-lg text-white "
          >
            <CardHeader className="flex flex-row gap-4 items-center">
              <Avatar className="w-16 h-16">
                <AvatarImage src={comment?.user?.image || ""} />
                <AvatarFallback className="bg-green-600 text-green-500 uppercase text-xl font-semibold">
                  {comment?.user?.username?.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex justify-between items-center w-full">
                <div className="space-y-1">
                  <h4 className="text-lg tracking-wide font-semibold">
                    @{comment?.user?.username}
                  </h4>
                  <p className="text-white/80 text-base tracking-wide">
                    {comment?.content}
                  </p>
                  <span className="text-dark-700">
                    {moment(comment?.updatedAt).fromNow()}
                  </span>
                </div>
                <div className="space-x-4">
                  <button>
                    <ThumbsUp />
                  </button>
                  {session?.user?.id == comment?.userId && (
                    <CommentEdit slug={slug} id={comment?.id} />
                  )}
                  {session?.user?.id == comment?.userId && (
                    <DeleteComment id={comment?.id} />
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
    </div>
  );
};
