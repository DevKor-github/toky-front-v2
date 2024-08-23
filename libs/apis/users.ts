import client from '@/libs/client/client';
import { Profile } from '@/libs/store/useAuthStore';

// Request Interfaces

// Response Interfaces

// Axios Async Func

export const getProfile = async () => {
  const response = await client.get<Profile>('/users/profile');
  return response.data;
};

// Query Hook
