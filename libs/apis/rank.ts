import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import client from '../client/client';

interface RankItem {
  rank: number;
  correctAnswerPercentage: number;
  name: string;
  university: number;
}

interface RankResponse {
  data: {
    rank: RankItem[];
  };
  meta: {
    hasNextData: boolean;
    customCursor: string;
  };
}

const PAGE_SIZE = 10;

export const useGetRankInfiniteScroll = () => {
  const fetchRank = async ({ pageParam }: { pageParam: string | undefined }) => {
    const response = await client.get<RankResponse>(`/bets/rank?cursor=${pageParam}&size=${PAGE_SIZE}`);
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

const getMyRank = async () => {
  const response = await client.get<RankItem>('/bets/rank/my');
  return response.data;
};

export const useGetMyRank = () => {
  return useQuery({
    queryKey: ['my-rank'],
    queryFn: getMyRank,
    retry: false,
  });
};
