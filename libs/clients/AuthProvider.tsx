'use client';

import { refresh } from '@/libs/clients/refresh';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { useCallback, useEffect } from 'react';

export function AuthProvider() {
  const { accessToken, refreshToken, clearTokens, setTokens } = useAuthStore();

  const setTokenFromCookie = useCallback(() => {
    let accessToken = null,
      refreshToken = null;

    document.cookie.split(';').forEach((c) => {
      if (c.trim().startsWith('access-token=')) accessToken = c.split('=')[1];
      if (c.trim().startsWith('refresh-token=')) refreshToken = c.split('=')[1];
    });
    if (!accessToken || !refreshToken) {
      clearTokens();
      return false;
    }

    document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    setTokens(accessToken, refreshToken);

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
