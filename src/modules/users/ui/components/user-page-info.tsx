import Link from "next/link";
import { cn } from "@/lib/utils";
import { useClerk, useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";

import { useSubscription } from "@/modules/subscriptions/hooks/use-subscription";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";

import { UserGetOneOutput } from "../../types";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  user: UserGetOneOutput;
}

export const UserPageInfoSkeleton = () => {
  return (
    <div className="py-6">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <Skeleton className="h-[60px] w-[60px] rounded-full" />
          <div className="flex min-w-0">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="mt-1 h-4 w-48" />
          </div>
        </div>
        <Skeleton className="mt-3 h-10 w-full rounded-full" />
      </div>

      {/* Desktop Layout */}
      <div className="hidden items-start gap-4 md:flex">
        <Skeleton className="h-[160px] w-[160px] rounded-full" />
      </div>
    </div>
  );
};

export const UserPageInfo = ({ user }: Props) => {
  const { userId, isLoaded } = useAuth();
  const clerk = useClerk();

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
  });

  return (
    <div className="py-6">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar
            size="lg"
            imageUrl={user.imageUrl}
            name={user.name}
            className="h-[60px] w-[60px]"
            onClick={() => {
              if (user.clerkId === userId) {
                clerk.openUserProfile();
              }
            }}
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <span>{user.subscriberCount} subscribers</span>
              <span>&bull;</span>
              <span>{user.videoCount} videos</span>
            </div>
          </div>
        </div>
        {userId === user.clerkId ? (
          <Button
            variant="secondary"
            asChild
            className="mt-3 w-full rounded-full"
          >
            <Link prefetch href="/studio">
              Go to studio
            </Link>
          </Button>
        ) : (
          <SubscriptionButton
            disabled={isPending || !isLoaded}
            isSubscribed={user.viewerSubscribed}
            onClick={onClick}
            className="mt-3 w-full"
          />
        )}
      </div>

      {/* Desktop layout */}
      <div className="hidden items-start gap-4 md:flex">
        <UserAvatar
          size="xl"
          imageUrl={user.imageUrl}
          name={user.name}
          className={cn(
            userId === user.clerkId &&
              "cursor-pointer transition-opacity duration-300 hover:opacity-80",
          )}
          onClick={() => {
            if (user.clerkId === userId) {
              clerk.openUserProfile();
            }
          }}
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <div className="mt-3 flex items-center gap-1 text-sm text-muted-foreground">
            <span>{user.subscriberCount} subscribers</span>
            <span>&bull;</span>
            <span>{user.videoCount} videos</span>
          </div>

          {userId === user.clerkId ? (
            <Button variant="secondary" asChild className="mt-3 rounded-full">
              <Link prefetch href="/studio">
                Go to studio
              </Link>
            </Button>
          ) : (
            <SubscriptionButton
              disabled={isPending || !isLoaded}
              isSubscribed={user.viewerSubscribed}
              onClick={onClick}
              className="mt-3"
            />
          )}
        </div>
      </div>
    </div>
  );
};
