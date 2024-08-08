'use client';

import { Icon } from '@/libs/design-system/icons';
import { easeInOut, motion } from 'framer-motion';
import Link from 'next/link';
import styled from 'styled-components';
import { SideBar } from '../SideBar';

export function MainTopBar() {
  return (
    <Wrapper
      className="MainTopBarWrapper"
      // initial={{
      //   opacity: 0,
      //   y: -90,
      // }}
      // animate={{
      //   opacity: 1,
      //   y: 0,
      // }}
      // transition={{ duration: 1.2, ease: easeInOut }}
    >
      <Link href={'/bets'}>
        <Icon.TokyLogo />
      </Link>
      <SideBar />
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
