import { DEFAULT_LIMIT } from "@/constants";
import { trpc } from "@/trpc/client";

interface CommentRepliesProps {
  parentId: string;
  videoId: string;
}

export const CommentReplies = ({ parentId, videoId }: CommentRepliesProps) => {
  const { data } = trpc.comments.getMany.useInfiniteQuery({
    limit: DEFAULT_LIMIT,
    videoId,
    parentId,
  });

  return (
    <>
      <div> CommentReplies</div>
    </>
  );
};
