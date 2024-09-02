import { create } from 'zustand';

export interface AuthStore {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

export const createAuthStore = () => {
  return create<AuthStore>()((set) => ({
    isLogin: false,
    login: () => set({ isLogin: true }),
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      set({ isLogin: false });
    },
  }));
};
