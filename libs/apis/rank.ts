import { useInfiniteQuery } from '@tanstack/react-query';
import client from '../client/client';

interface RankResponse {
  data: {
    rank: number;
    correctAnswerPercentage: number;
    name: string;
    university: number;
  }[];
  meta: {
    hasNextData: boolean;
    customCursor: string;
  };
}

const PAGE_SIZE = 10;

const useGetRankInfiniteScroll = () => {
  const fetchRank = async ({ pageParam }: { pageParam: string | undefined }) => {
    const response = await client.get<RankResponse>(`/api/rank?cursor=${pageParam}&size=${PAGE_SIZE}`);
    return response.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: ['rank'],
    queryFn: fetchRank,
    initialPageParam: undefined as string | undefined,
    getNextPageParam: ({ meta: { hasNextData, customCursor } }) => (hasNextData ? customCursor : undefined),
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export default useGetRankInfiniteScroll;
