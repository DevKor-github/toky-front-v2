'use client';

import client from '@/libs/client/client';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { InternalAxiosRequestConfig } from 'axios';
import { useCallback, useEffect } from 'react';

export function AuthProvider() {
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore((state) => state);

  const refresh = useCallback(async () => {
    try {
      const { data } = await client.post(`/auth/refresh`, {}, { headers: { Authorization: `Bearer ${refreshToken}` } });
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        return data.accessToken as string;
      }
    } catch (err) {
      console.log(err);
    }
    clearTokens();

    return null;
  }, [clearTokens, setTokens, refreshToken]);

  const errorHandler = async (error: any) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && config.url !== '/auth/refresh' && !config.sent) {
      config.sent = true;
      const newAccessToken = await refresh();

      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(originalRequest);
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  };

  const requestHandler = (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  };

  const requestInterceptor = client.interceptors.request.use(requestHandler, (error) => Promise.reject(error));

  const responseInterceptor = client.interceptors.response.use((response) => response, errorHandler);

  useEffect(() => {
    return () => {
      client.interceptors.request.eject(requestInterceptor);
      client.interceptors.response.eject(responseInterceptor);
    };
  }, [responseInterceptor, requestInterceptor]);

  useEffect(() => {
    if (accessToken === null) {
      if (refreshToken === null) {
        let accessTokenFromCookie = null;
        let refreshTokenFromCookie = null;
        document.cookie.split(';').forEach((c) => {
          if (c.trim().startsWith('access-token=')) accessTokenFromCookie = c.split('=')[1];
          if (c.trim().startsWith('refresh-token=')) refreshTokenFromCookie = c.split('=')[1];
        });

        if (accessTokenFromCookie === null || refreshTokenFromCookie === null) {
          clearTokens();
          return;
        }

        document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        setTokens(accessTokenFromCookie, refreshTokenFromCookie);
      } else {
        refresh();
      }
    }
  }, [accessToken, refreshToken, setTokens, clearTokens, refresh]);

  return <></>;
}
