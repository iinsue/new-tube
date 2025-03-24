"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { trpc } from "@/trpc/client";

import { DEFAULT_LIMIT } from "@/constants";

import { CommentForm } from "@/modules/comments/ui/components/comment-form";
import { CommentItem } from "@/modules/comments/ui/components/comment-item";
import { InfiniteScroll } from "@/components/infinite-scroll";

import { Loader2Icon } from "lucide-react";

interface CommentsSectionProps {
  videoId: string;
}

export const CommentsSection = ({ videoId }: CommentsSectionProps) => {
  return (
    <Suspense fallback={<CommentsSectionSkeleton />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <CommentsSectionSuspense videoId={videoId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CommentsSectionSkeleton = () => {
  return (
    <div className="mt-6 flex items-center justify-center">
      <Loader2Icon className="size-7 animate-spin text-muted-foreground" />
    </div>
  );
};

const CommentsSectionSuspense = ({ videoId }: CommentsSectionProps) => {
  const [comments, query] = trpc.comments.getMany.useSuspenseInfiniteQuery(
    {
      videoId,
      limit: DEFAULT_LIMIT,
    },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-lg font-bold">
          {comments.pages[0].totalCount} Comments
        </h1>
        <CommentForm videoId={videoId} />
      </div>

      <div className="mt-2 flex flex-col gap-4">
        {comments.pages
          .flatMap((page) => page.items)
          .map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

        <InfiniteScroll
          isManual
          hasNextPage={query.hasNextPage}
          isFetchingNextPage={query.isFetchingNextPage}
          fetchNextPage={query.fetchNextPage}
        />
      </div>
    </div>
  );
};
