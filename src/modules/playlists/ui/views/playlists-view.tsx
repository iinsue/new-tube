"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { PlaylistCreateModal } from "../components/playlist-create-modal";
import { PlaylistsSection } from "../sections/playlists-section";

import { PlusIcon } from "lucide-react";

export const PlaylistsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="mx-auto mb-10 flex max-w-[2400px] flex-col gap-y-6 px-4 pt-2.5">
      <PlaylistCreateModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
      />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Playlists</h1>
          <p className="text-xs text-muted-foreground">
            Collections you have created
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setCreateModalOpen(true)}
        >
          <PlusIcon />
        </Button>
      </div>

      <PlaylistsSection />
    </div>
  );
};
