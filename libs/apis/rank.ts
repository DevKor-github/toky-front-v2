import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import client from '../client/client';

export interface RankItem {
  rank: number;
  correctAnswerPercentage: number;
  name: string;
  university: number;
}

interface RankResponse {
  data: RankItem[];
  meta: {
    hasNextData: boolean;
    nextCursor: string;
  };
}

export const useGetRankInfiniteScroll = (pageSize: number, queryKey: string) => {
  const fetchRank = async ({ pageParam }: { pageParam: string }) => {
    const response = await client.get<RankResponse>(`/bets/rank?take=${pageSize}&cursor=${pageParam}`);
    return response.data;
  };

  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchRank,
    initialPageParam: '' as string,
    getNextPageParam: ({ meta: { hasNextData, nextCursor } }) => (hasNextData ? nextCursor : undefined),
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
