import { useAuth } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { UserGetOneOutput } from "../../types";
import { Edit2Icon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  user: UserGetOneOutput;
}

export const UserPageBannerSkeleton = () => {
  return <Skeleton className="h-[15vh] max-h-[200px] w-full md:h-[25vh]" />;
};

export const UserPageBanner = ({ user }: Props) => {
  const { userId } = useAuth();

  return (
    <div className="group relative">
      {/* TODO: Add upload banner modal */}
      <div
        className={cn(
          "h-[15vh] max-h-[200px] w-full rounded-xl bg-gray-100 bg-gradient-to-r from-gray-100 to-gray-200 md:h-[25vh]",
          user.bannerUrl ? "bg-cover bg-center" : "bg-gray-100",
        )}
        style={{
          backgroundImage: user.bannerUrl
            ? `url(${user.bannerUrl})`
            : undefined,
        }}
      >
        {user.clerkId === userId && (
          <Button
            type="button"
            size="icon"
            className="hover:black/50 absolute right-4 top-4 rounded-full bg-black/50 opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0 [&_svg]:size-4"
          >
            <Edit2Icon className="text-white" />
          </Button>
        )}
      </div>
    </div>
  );
};
