import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
import { SearchView } from "@/modules/search/ui/views/search-view";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{
    query: string | undefined;
    categoryId: string | undefined;
  }>;
}

const SearchPage = async ({ searchParams }: Props) => {
  const { query, categoryId } = await searchParams;

  void trpc.categories.getMany.prefetch();
  void trpc.search.getMany.prefetch({
    query,
    categoryId,
    limit: DEFAULT_LIMIT,
  });

  return (
    <HydrateClient>
      <SearchView query={query} categoryId={categoryId} />
    </HydrateClient>
  );
};

export default SearchPage;
