import { Card, CardHeader } from "@/components/ui/card";
import { getComments } from "../_data-access";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { CommentEdit } from "./comment-edit";
import { auth } from "@/auth";
import { DeleteComment } from "./delete-comment";
import { CommentLike } from "./comment-like";
import { Suspense } from "react";
import { Loader2 } from "@/components/loader2";

export const CommentList = async ({ slug }: { slug: string }) => {
  const { formattedComments: comments } = await getComments(slug);
  const session = await auth();

  return (
    <Suspense fallback={<Loader2 />}>
      <div className="space-y-4">
        {comments &&
          comments.map((comment) => (
            <Card
              key={comment.id}
              className="bg-cardLg border-none bg-cover shadow-lg text-white p-2"
            >
              <div className="flex flex-row  gap-4 items-start md:items-center ">
                <Avatar className="md:w-16 md:h-16">
                  <AvatarImage
                    src={comment?.user?.image || ""}
                    alt="user-profile"
                  />
                  <AvatarFallback className="bg-green-600 text-green-500 uppercase text-xl font-semibold">
                    {comment?.user?.username?.slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1  w-full">
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
              </div>
              <div className="space-x-4  my-2 flex">
                {session?.user && (
                  <CommentLike
                    commentId={comment?.id}
                    userHasLiked={comment?.userHasLiked}
                    count={comment?.likeCount}
                  />
                )}
                {session?.user?.id == comment?.userId && (
                  <CommentEdit slug={slug} id={comment?.id} />
                )}
                {session?.user?.id == comment?.userId && (
                  <DeleteComment id={comment?.id} />
                )}
              </div>
            </Card>
          ))}
      </div>
    </Suspense>
  );
};
