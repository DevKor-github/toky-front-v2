'use client';

import { useAuthStore } from '@/libs/store/useAuthStore';
import { getCookie } from '@/libs/utils/getCookie';
import { useEffect } from 'react';

export function AuthProvider() {
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore((state) => state);

  useEffect(() => {
    console.log(accessToken, refreshToken);
    if (accessToken === null) {
      if (refreshToken === null) {
        const accessTokenFromCookie = getCookie('access-token');
        const refreshTokenFromCookie = getCookie('refresh-token');

        if (accessTokenFromCookie === null || refreshTokenFromCookie === null) {
          clearTokens();
          return;
        }

        document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        setTokens(accessTokenFromCookie, refreshTokenFromCookie);
      } else {
        // refresh
        console.log('refresh!');
      }
    }
  }, [accessToken, refreshToken, setTokens, clearTokens]);

  return <></>;
}
