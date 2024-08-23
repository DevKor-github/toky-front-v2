import client from '@/libs/client/client';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { useMutation, useQuery } from '@tanstack/react-query';

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
  const clearTokens = useAuthStore((state) => state.clearTokens);
  return useMutation({ mutationFn: postLogout, onSuccess: clearTokens });
};

export const useGetNeedSignup = () => {
  return useQuery({
    queryKey: ['needSignup'],
    queryFn: getNeedSignup,
    retry: false,
  });
};
