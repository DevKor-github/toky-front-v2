'use client';

import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';
import styled from 'styled-components';

export function AuthLoader({ children }: { children: React.ReactNode }) {
  const isLogin = useAuthStore((state) => state.isLogin);
  return <>{isLogin === null ? <Loader /> : children}</>;
}

const Loader = styled.div`
  background-color: #121212;
  width: 100vw;
  height: 100vh;
`;
