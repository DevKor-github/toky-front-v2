'use client';

import client from '@/libs/client/client';
import { useAuthStore } from '@/libs/store/useAuthStore';
import axios, { InternalAxiosRequestConfig } from 'axios';
import { useEffect } from 'react';

export function AuthProvider() {
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore((state) => state);

  const errorHandler = async (error: any) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          },
        );

        setTokens(data.accessToken, data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return client(originalRequest);
      } catch (err) {
        clearTokens();
        // 필요시 로그아웃 처리
        return Promise.reject(err);
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
    console.log('token from zustand');
    console.log(accessToken, refreshToken);
    if (accessToken === null) {
      if (refreshToken === null) {
        let accessTokenFromCookie = null;
        let refreshTokenFromCookie = null;
        document.cookie.split(';').forEach((c) => {
          if (c.trim().startsWith('access-token=')) accessTokenFromCookie = c.split('=')[1];
          if (c.trim().startsWith('refresh-token=')) refreshTokenFromCookie = c.split('=')[1];
        });

        console.log(document.cookie);
        console.log('token from cookie');
        console.log(accessTokenFromCookie, refreshTokenFromCookie);

        if (accessTokenFromCookie === null || refreshTokenFromCookie === null) {
          clearTokens();
          return;
        }

        console.log('쿠키 지우기');
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
