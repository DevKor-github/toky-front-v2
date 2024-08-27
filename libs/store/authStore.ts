import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const createAuthStore = () => {
  return create<AuthStore>()(
    persist(
      (set) => ({
        accessToken: null,
        refreshToken: null,
        isLogin: false,
        setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken, isLogin: true }),
        clearTokens: () => set({ accessToken: null, refreshToken: null, isLogin: false }),
      }),
      { name: 'user-auth', storage: createJSONStorage(() => localStorage) },
    ),
  );
};
