import { HydrateClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { LikedView } from "@/modules/playlists/ui/views/liked-view";

export const dynamic = "force-dynamic";

const Page = () => {
  void trpc.playlists.getLiked.prefetchInfinite({ limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <LikedView />
    </HydrateClient>
  );
};

export default Page;
