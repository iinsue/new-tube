import { toast } from "sonner";
import { useClerk } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";

import { VideoGetOneOutput } from "../../types";

interface VideoReactionsProps {
  videoId: string;
  likes: number;
  dislikes: number;
  viewerReaction: VideoGetOneOutput["viewerReaction"];
}

export const VideoReactions = ({
  viewerReaction,
  videoId,
  dislikes,
  likes,
}: VideoReactionsProps) => {
  const clerk = useClerk();
  const utils = trpc.useUtils();

  const like = trpc.videoReactions.like.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
      utils.playlists.getLiked.invalidate();
    },

    onError: (error) => {
      toast.error("Something went wrong", { id: "reaction" });

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const dislike = trpc.videoReactions.dislike.useMutation({
    onSuccess: () => {
      utils.videos.getOne.invalidate({ id: videoId });
      utils.playlists.getLiked.invalidate();
    },

    onError: (error) => {
      toast.error("Something went wrong");

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  return (
    <div className="flex flex-none items-center">
      <Button
        variant="secondary"
        onClick={() => like.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
        className="gap-2 rounded-l-full rounded-r-none pr-4"
      >
        <ThumbsUpIcon
          className={cn("size-5", viewerReaction === "like" && "fill-black")}
        />
        {likes}
      </Button>

      <Separator orientation="vertical" className="h-7" />

      <Button
        variant="secondary"
        onClick={() => dislike.mutate({ videoId })}
        disabled={like.isPending || dislike.isPending}
        className="rounded-l-none rounded-r-full pl-3"
      >
        <ThumbsDownIcon
          className={cn("size-5", viewerReaction === "dislike" && "fill-black")}
        />
        {dislikes}
      </Button>
    </div>
  );
};
