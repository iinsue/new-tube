import Link from "next/link";

import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import { PlaylistGetManyOutput } from "@/modules/playlists/types";
import {
  PlaylistThumbnail,
  PlaylistThumbnailSkeleton,
} from "./playlist-thumbnail";
import { PlaylistInfo, PlaylistInfoSkeleton } from "./playlist-info";

interface Props {
  data: PlaylistGetManyOutput["items"][number];
}

export const PlaylistGridCardSkeleton = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <PlaylistThumbnailSkeleton />
      <PlaylistInfoSkeleton />
    </div>
  );
};

export const PlaylistGridCard = ({ data }: Props) => {
  return (
    <Link prefetch href={`/playlists/${data.id}`}>
      <div className="group flex w-full flex-col gap-2">
        <PlaylistThumbnail
          imageUrl={data.thumbnailUrl || THUMBNAIL_FALLBACK}
          title={data.name}
          videoCount={data.videoCount}
        />
        <PlaylistInfo data={data} />
      </div>
    </Link>
  );
};
