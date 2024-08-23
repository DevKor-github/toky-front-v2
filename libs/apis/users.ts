import client from '@/libs/client/client';
import { Profile } from '@/libs/store/useProfileStore';
import { useQuery } from '@tanstack/react-query';

// Request Interfaces

// Response Interfaces

// Axios Async Func

const getProfile = async () => {
  const response = await client.get<Profile>('/users/profile');
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
