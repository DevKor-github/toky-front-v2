'use client';

import { useCallback, useEffect } from 'react';
import { useGetProfile } from '@/libs/apis/users';
import { useGetTickets } from '../apis/tickets';
import { useAuthStore } from '../store/Providers/AuthStoreProvider';
import { useProfileStore } from '../store/Providers/ProfileStoreProvider';
import { useTicketStore } from '../store/Providers/TicketStoreProvider';
import { refresh } from '@/libs/client/createAxiosInstance';

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
  }, [signIn, signOut]);

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
