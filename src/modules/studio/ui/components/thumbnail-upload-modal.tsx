import { useState } from "react";
import { trpc } from "@/trpc/client";
import { UploadDropzone } from "@/lib/uploadthing";
import { ResponsiveModal } from "@/components/responsive-modal";

interface ThumbnailUploadModalProps {
  videoId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ThumbnailUploadModal = ({
  videoId,
  open,
  onOpenChange,
}: ThumbnailUploadModalProps) => {
  const utils = trpc.useUtils();
  const [isPending, setIsPending] = useState(false);

  const onUploadComplete = () => {
    utils.studio.getMany.invalidate();
    utils.studio.getOne.invalidate({ id: videoId });
    onOpenChange(false);
    setIsPending(false);
  };

  return (
    <ResponsiveModal
      title="Upload a thumbnail"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint="thumbnailUploader"
        input={{ videoId }}
        onClientUploadComplete={onUploadComplete}
        onUploadBegin={() => setIsPending(true)}
        disabled={isPending}
      />
    </ResponsiveModal>
  );
};
