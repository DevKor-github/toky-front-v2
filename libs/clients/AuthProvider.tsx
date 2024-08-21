'use client';

import { refresh } from '@/libs/clients/refresh';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { getCookieValue } from '@/libs/utils/getCookieValue';
import { useCallback, useEffect } from 'react';

export function AuthProvider() {
  const { accessToken, refreshToken, clearTokens, setTokens } = useAuthStore();

  const setTokenFromCookie = useCallback(() => {
    const accessTokenFromCookie = getCookieValue('access-token'),
      refreshTokenFromCookie = getCookieValue('refresh-token');

    console.log(`access: ${accessTokenFromCookie}`);
    console.log(`refresh: ${refreshTokenFromCookie}`);

    if (!accessTokenFromCookie || !refreshTokenFromCookie) {
      clearTokens();
      return false;
    }

    document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    setTokens(accessTokenFromCookie, refreshTokenFromCookie);

    return true;
  }, [clearTokens, setTokens]);

  const checkAuth = useCallback(async () => {
    if (refreshToken) {
      await refresh(process.env.NEXT_PUBLIC_API_URL ?? '');
    } else {
      setTokenFromCookie();
    }
  }, [refreshToken, setTokenFromCookie]);

  useEffect(() => {
    if (accessToken === null) checkAuth();
  }, [accessToken, checkAuth]);

  return <></>;
}
