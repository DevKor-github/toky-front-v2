'use client';

import { useCallback, useEffect } from 'react';
import { InternalAxiosRequestConfig } from 'axios';
import client from '@/libs/client/client';
import { useGetProfile } from '@/libs/apis/users';
import { useGetTickets } from '../apis/tickets';
import { useAuthStore } from '../store/Providers/AuthStoreProvider';
import { useProfileStore } from '../store/Providers/ProfileStoreProvider';
import { useTicketStore } from '../store/Providers/TicketStoreProvider';
import mem from 'mem';

const REFRESH_URL = '/auth/refresh';

export function AuthProvider() {
  const { isLogin, login, logout } = useAuthStore((state) => state);
  const setProfile = useProfileStore((state) => state.setProfile);
  const setTickets = useTicketStore((state) => state.setTickets);

  const { data: updateProfile, refetch: getProfile, isSuccess: isGetProfileSuccess } = useGetProfile();
  const { data: tickets, refetch: getTickets, isSuccess: isGetTicketsSuccess } = useGetTickets();

  const signIn = useCallback(
    (accessToken: string, refreshToken: string) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      login();
    },
    [login],
  );
  const signOut = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    logout();
  }, [logout]);

  const refresh = useCallback(
    mem(
      async () => {
        try {
          const { data } = await client.post(REFRESH_URL);
          if (data.accessToken && data.refreshToken) {
            signIn(data.accessToken, data.refreshToken);
            return data.accessToken as string;
          }
        } catch (err) {
          console.log(err);
          signOut();
        }

        return null;
      },
      { maxAge: 1000 },
    ),
    [signIn, signOut],
  );

  const errorHandler = async (error: any) => {
    const { config, response } = error;

    if (response?.status === 401 && config.url !== REFRESH_URL && !config.sent) {
      config.sent = true;
      const newAccessToken = await refresh();

      if (newAccessToken) {
        console.log(`New Access Token :: ${newAccessToken}`);
        config.headers.Authorization = `Bearer ${newAccessToken}`;
        return client(config);
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  };

  const requestHandler = (config: InternalAxiosRequestConfig) => {
    let token: string | null = null;

    if (config.url === REFRESH_URL) {
      token = localStorage.getItem('refreshToken');
    } else {
      token = localStorage.getItem('accessToken');
    }

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
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
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken === null) {
      if (refreshToken === null) {
        let accessTokenFromCookie = null;
        let refreshTokenFromCookie = null;
        document.cookie.split(';').forEach((c) => {
          if (c.trim().startsWith('access-token=')) accessTokenFromCookie = c.split('=')[1];
          if (c.trim().startsWith('refresh-token=')) refreshTokenFromCookie = c.split('=')[1];
        });

        if (accessTokenFromCookie === null || refreshTokenFromCookie === null) {
          signOut();
          return;
        }

        document.cookie = 'access-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        signIn(accessTokenFromCookie, refreshTokenFromCookie);
      } else {
        refresh();
      }
    }
  }, [signIn, signOut, refresh]);

  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      login();
    }
  }, [login]);

  useEffect(() => {
    if (isLogin) {
      // 로그인 시 fetch
      getProfile();
      getTickets();
    }
  }, [isLogin, getProfile, getTickets]);

  useEffect(() => {
    if (isGetProfileSuccess) setProfile(updateProfile);
  }, [updateProfile, isGetProfileSuccess, setProfile]);

  useEffect(() => {
    if (isGetTicketsSuccess) setTickets(tickets);
  }, [tickets, isGetTicketsSuccess, setTickets]);

  return <></>;
}
