'use client';

import { Icon } from '@/libs/design-system/icons';
import { easeInOut, motion, useAnimation } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { SideBar } from '../SideBar';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { Flex } from '@/libs/design-system/flex';
import { TicketInfo } from './TicketInfo';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { KakaoLogin } from '../KakaoLogin';

export function MainTopBar() {
  const pathname = usePathname();
  const navControls = useAnimation();
  const { isLogin } = useAuthStore();
  const isHome = pathname === '/';
  const navigationAnimation = useCallback(async () => {
    await navControls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: 'easeInOut' },
    });
  }, [navControls]);

  useEffect(() => {
    if (isHome) {
      navigationAnimation();
    }
  }, [navigationAnimation, pathname]);

  return (
    <Wrapper
      className="MainTopBarWrapper"
      initial={pathname === '/' ? { opacity: 0, y: -90 } : { opacity: 1, y: 0 }}
      animate={navControls}
      transition={{ duration: 1.2, ease: easeInOut }}
    >
      <Link href={'/'}>
        <Icon.TokyLogo />
      </Link>
      <Flex $gap={12} $align="center">
        {isLogin ? <TicketInfo /> : !isHome && <KakaoLogin />}
        <SideBar />
      </Flex>
    </Wrapper>
  );
}
const Wrapper = styled(motion.div)`
  width: 100%;
  height: ${({ theme }) => theme.space.mainTopBarHeight}px;
  background-color: ${({ theme }) => theme.colors.topBar};
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  color: white;
  box-shadow: 0px 4px 4px rgba(18, 18, 18, 0.25);
  z-index: ${({ theme }) => theme.zIndex.MainTopBar};
`;
