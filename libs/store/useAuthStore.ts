import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Profile {
  name: string;
  university: number;
  ticket: number;
  phoneNumber: string;
  inviteCode: string;
}

interface AuthStore {
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;
  profile: Profile | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setProfile: (props: Profile) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isLogin: false,
      profile: null,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken, isLogin: true }),
      setProfile: (profile: Profile) => {
        set({ profile });
      },
      clearTokens: () => set({ accessToken: null, refreshToken: null, isLogin: false, profile: null }),
    }),
    { name: 'user-auth', getStorage: () => localStorage },
  ),
);
