'use client';

import { useCallback, useEffect } from 'react';
import { InternalAxiosRequestConfig } from 'axios';
import client from '@/libs/client/client';
import { useGetProfile } from '@/libs/apis/users';
import { useGetTickets } from '../apis/tickets';
import { useAuthStore } from '../store/Providers/AuthStoreProvider';
import { useProfileStore } from '../store/Providers/ProfileStoreProvider';
import { useTicketStore } from '../store/Providers/TicketStoreProvider';

const REFRESH_URL = '/auth/refresh';

export function AuthProvider() {
  const { accessToken, refreshToken, setTokens, clearTokens, isLogin } = useAuthStore((state) => state);
  const setProfile = useProfileStore((state) => state.setProfile);
  const setTickets = useTicketStore((state) => state.setTickets);

  const { data: updateProfile, refetch: getProfile, isSuccess: isGetProfileSuccess } = useGetProfile();
  const { data: tickets, refetch: getTickets, isSuccess: isGetTicketsSuccess } = useGetTickets();

  const refresh = useCallback(async () => {
    try {
      const { data } = await client.post(REFRESH_URL);
      if (data.accessToken && data.refreshToken) {
        console.log(1);
        setTokens(data.accessToken, data.refreshToken);
        return data.accessToken as string;
      }
    } catch (err) {
      console.log(err);
    }
    console.log(2);
    clearTokens();

    return null;
  }, [clearTokens, setTokens]);

  const errorHandler = async (error: any) => {
    const { config, response } = error;
    const originalRequest = config;

    if (response?.status === 401 && config.url !== REFRESH_URL && !config.sent) {
      if (refreshToken == null) return Promise.reject(error);
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
          console.log(3);
          return;
        }

        document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        console.log(4);
        setTokens(accessTokenFromCookie, refreshTokenFromCookie);
      } else {
        refresh();
      }
    }
  }, [accessToken, refreshToken, setTokens, clearTokens, refresh]);

  useEffect(() => {
    if (isLogin) {
      // 로그인 시 fetch
      getProfile();
      getTickets();
    }
  }, [isLogin, getProfile]);

  useEffect(() => {
    if (isGetProfileSuccess) setProfile(updateProfile);
  }, [updateProfile, isGetProfileSuccess, setProfile]);

  useEffect(() => {
    if (isGetTicketsSuccess) setTickets(tickets);
  }, [tickets, isGetTicketsSuccess, setTickets]);

  return <></>;
}
