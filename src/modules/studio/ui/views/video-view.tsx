import { FormSection } from "../sections/form-section";

interface PageProps {
  videoId: string;
}

export const VideoView = ({ videoId }: PageProps) => {
  return (
    <div className="max-w-screen-lg px-4 pt-2.5">
      <FormSection videoId={videoId} />
    </div>
  );
};
