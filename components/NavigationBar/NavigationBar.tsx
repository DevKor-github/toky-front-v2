'use client';

import { Flex } from '@/libs/design-system/flex';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

export function NavigationBar() {
  const pathname = usePathname();
  return (
    <Wrapper>
      <Flex $justify="space-around">
        <Link href="/">
          <NavigationItem selected={pathname === '/'}>홈</NavigationItem>
        </Link>
        <Link href="/bets">
          <NavigationItem selected={pathname === '/bets'}>승부예측</NavigationItem>
        </Link>
        <Link href="/analyze">
          <NavigationItem selected={pathname === '/analyze'}>전력분석</NavigationItem>
        </Link>
        <Link href="/attendance">
          <NavigationItem selected={pathname === '/attendance'}>출석체크</NavigationItem>
        </Link>
        <Link href="/draw">
          <NavigationItem selected={pathname === '/draw'}>경품응모</NavigationItem>
        </Link>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.space.mainTopBarHeight}px;
  left: 0;

  width: 100%;
  height: ${({ theme }) => theme.space.navigationBarHeght}px;
  background-color: ${({ theme }) => theme.colors.navigationBar};
`;

const NavigationItem = styled.div<{ selected: boolean }>`
  height: 46px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.38);
  cursor: pointer;
  padding: 0 2px;

  ${({ selected }) => selected && 'color: #ffffff;'}

  &::after {
    content: '';
    width: 100%;
    height: 2px;
    background: #ffffff;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }
  ${(props) => props.selected && `&::after`} {
    opacity: 1;
  }
`;
