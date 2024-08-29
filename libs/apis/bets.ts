import { useQuery } from '@tanstack/react-query';
import client from '../client/client';

interface ShareScore {
  numWinKorea: number;
  numWinYonsei: number;
  numDraw: number;
}
const getShareScore = async () => {
  const response = await client.get<ShareScore>('/bets/share');
  return response.data;
};

export const useGetShareScore = () => {
  return useQuery({
    queryKey: ['bets-share'],
    queryFn: getShareScore,
  });
};
