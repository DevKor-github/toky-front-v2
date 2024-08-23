import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isLogin: false,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken, isLogin: true }),
      clearTokens: () => set({ accessToken: null, refreshToken: null, isLogin: false }),
    }),
    { name: 'user-auth' },
  ),
);
