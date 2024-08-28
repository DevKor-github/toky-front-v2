import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../client/client';

interface CheerTotalInfo {
  participants: number[];
}
interface CheerMyInfo {
  univ: number;
}

const getCheersParticipants = async () => {
  const response = await client.get<CheerTotalInfo>('/cheers/participants');
  return response.data;
};
const postCheers = async (params: CheerMyInfo) => {
  const response = await client.post('/cheers', params);
  return response;
};
const getMyCheer = async () => {
  const response = await client.get<CheerMyInfo>('/cheers/my');
  return response.data;
};

export const useGetCheersParticipants = () => {
  return useQuery({
    queryKey: ['cheers-participants'],
    queryFn: getCheersParticipants,
  });
};

export const useGetMyCheer = () => {
  return useQuery({
    queryKey: ['cheers-my'],
    queryFn: getMyCheer,
    enabled: false,
  });
};

export const usePostCheers = () => {
  return useMutation({ mutationFn: postCheers });
};
