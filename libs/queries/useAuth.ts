import { useMutation } from '@tanstack/react-query';
import client from '../clients/client';

export function useAuth() {
  const kakaoLogin = async () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/kakao';
  };

  const { mutate: logout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: async () => {
      const response = await client.post('/auth/logout');
      return response ?? null;
    },
  });

  function clickLogin() {
    kakaoLogin();
  }

  function clickLogout() {
    logout();
  }

  return { clickLogin, clickLogout };
}
