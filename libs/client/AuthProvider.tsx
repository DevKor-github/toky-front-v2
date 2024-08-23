'use client';

import { useCallback, useEffect } from 'react';
import { InternalAxiosRequestConfig } from 'axios';
import client from '@/libs/client/client';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { useGetProfile } from '@/libs/apis/users';

const REFRESH_URL = '/auth/refresh';

export function AuthProvider() {
  const { accessToken, refreshToken, setTokens, clearTokens, isLogin, profile, setProfile } = useAuthStore(
    (state) => state,
  );
  const { data: updateProfile, refetch, isSuccess } = useGetProfile();

  const refresh = useCallback(async () => {
    try {
      const { data } = await client.post(REFRESH_URL);
      if (data.accessToken && data.refreshToken) {
        setTokens(data.accessToken, data.refreshToken);
        return data.accessToken as string;
      }
    } catch (err) {
      console.log(err);
    }
    clearTokens();

    return null;
  }, [clearTokens, setTokens]);

  const errorHandler = async (error: any) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && config.url !== REFRESH_URL && !config.sent) {
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
    if (config.url === REFRESH_URL) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    } else {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
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

  useEffect(() => {
    if (isLogin) {
      // 로그인 시 profile fetch
      refetch();
    }
  }, [isLogin, refetch]);

  useEffect(() => {
    if (isSuccess) setProfile(updateProfile);
  }, [updateProfile, isSuccess, setProfile]);

  return <></>;
}
