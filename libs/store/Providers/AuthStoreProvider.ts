import { create } from 'zustand';

export interface AuthStore {
  isLogin: boolean | null;
  login: () => void;
  logout: () => void;
  setLogin: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>()((set) => ({
  isLogin: null,
  login: () => set({ isLogin: true }),
  logout: async () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    set({ isLogin: false });
  },
  setLogin: (value: boolean) => set({ isLogin: value }),
}));
