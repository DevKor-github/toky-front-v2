import client from '@/libs/client/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthStore } from '../store/Providers/AuthStoreProvider';

// Request Interfaces
interface PostSignupRequest {
  phoneNumber: string;
  name: string;
  university: number;
  inviteCode?: string;
}

interface GetCheckNameRequest {
  name: string;
}

// Response Interfaces

// Axios Async Func

const postSignup = async (body: PostSignupRequest) => {
  const response = await client.post('/auth/signup', body);
  return response;
};

const postLogout = async () => {
  const response = await client.post('/auth/logout');
  return response;
};

export const getCheckName = async (params: GetCheckNameRequest) => {
  const response = await client.get<boolean>('/auth/check-name', {
    params,
  });
  return response.data;
};

const getNeedSignup = async () => {
  const response = await client.get<boolean>('/auth/need-signup');
  return response.data;
};

// Query Hook

export const usePostSignup = () => {
  return useMutation({ mutationFn: postSignup });
};

export const usePostLogout = () => {
  const logout = useAuthStore((state) => state.logout);
  const signOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    logout();
  };
  return useMutation({ mutationFn: postLogout, onSuccess: signOut });
};

export const useGetNeedSignup = () => {
  return useQuery({
    queryKey: ['needSignup'],
    queryFn: getNeedSignup,
    retry: false,
    enabled: false,
  });
};
