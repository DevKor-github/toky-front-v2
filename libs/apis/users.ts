import client from '@/libs/client/client';
import { Profile } from '@/libs/store/useProfileStore';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Request Interfaces

// Response Interfaces

interface GetProfileResponse {
  name: string;
  university: number;
  phoneNumber: string;
  inviteCode: string;
  ticket: number;
}

// Axios Async Func

const getProfile = async () => {
  const response = await client.get<GetProfileResponse>('/users/profile');
  return response.data;
};

const patchProfile = async (params: Pick<Profile, 'name' | 'phoneNumber'>) => {
  const response = await client.patch<GetProfileResponse>('/users/profile', params);
  return response.data;
};

// Query Hook

export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: false,
  });
};

export const usePatchProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchProfile,
    onSuccess: (response) => {
      queryClient.setQueryData(['profile'], () => response);
    },
  });
};
