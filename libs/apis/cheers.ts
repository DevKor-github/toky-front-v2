import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../client/client';
import { AxiosResponse } from 'axios';

interface CheerInfo {
  cheering: number | null;
  participants: number[];
}
interface CheerRequest {
  univ: number;
}

const getCheersParticipants = async () => {
  const response = await client.get<CheerInfo>('/cheers/participants');
  return response.data;
};
const postCheers = async (params: CheerRequest) => {
  const response = await client.post('/cheers', params);
  return response;
};

export const useGetCheersParticipants = () => {
  return useQuery({
    queryKey: ['cheers-participants'],
    queryFn: getCheersParticipants,
  });
};

export const usePostCheers = () => {
  return useMutation({ mutationFn: postCheers });
};
