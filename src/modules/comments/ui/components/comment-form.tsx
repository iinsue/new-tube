import { z } from "zod";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useUser, useClerk } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { commentInsertSchema } from "@/db/schema";
import { Textarea } from "@/components/ui/textarea";
import { UserAvatar } from "@/components/user-avatar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface CommentFormProps {
  videoId: string;
  onSuccess?: () => void;
}

const formSchema = commentInsertSchema.omit({ userId: true });

export const CommentForm = ({ videoId, onSuccess }: CommentFormProps) => {
  const clerk = useClerk();
  const { user } = useUser();

  const utils = trpc.useUtils();
  const create = trpc.comments.create.useMutation({
    onSuccess: () => {
      utils.comments.getMany.invalidate({ videoId });
      form.reset();
      toast.success("Comment added.");
      onSuccess?.();
    },

    onError: (error) => {
      toast.error("Something went wrong", { id: "comment" });

      if (error.data?.code === "UNAUTHORIZED") {
        clerk.openSignIn();
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      videoId,
      value: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    create.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="group flex gap-4">
        <UserAvatar
          size="lg"
          imageUrl={user?.imageUrl || "/user-placeholder.svg"}
          name={user?.username || "User"}
        />
        <div className="flex-1">
          <FormField
            name="value"
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add a comment..."
                      className="min-h-0 resize-none overflow-hidden bg-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <div className="mt-2 flex justify-end gap-2">
            <Button type="submit" size="sm" disabled={create.isPending}>
              Comment
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
