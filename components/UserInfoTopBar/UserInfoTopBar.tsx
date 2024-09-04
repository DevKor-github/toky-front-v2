'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';

import { ArrowLeft } from '@/libs/design-system/icons/ArrowLeft';

export function UserInfoTopBar() {
  const router = useRouter();

  return (
    <Wrapper>
      <FlexItems $position="left">
        <button onClick={() => router.back()}>
          <ArrowLeft />
        </button>
      </FlexItems>
      <FlexItems $position="center">회원 정보 관리</FlexItems>
      <FlexItems $position="right" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.space.navigationBarHeight}px;
  background-color: ${({ theme }) => theme.colors.topBar};
  padding: 13px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  color: white;
  z-index: ${({ theme }) => theme.zIndex.NavigationBar};
`;

const FlexItems = styled.div<{ $position: 'left' | 'right' | 'center' }>`
  flex-grow: 1;
  flex-basis: 0;
  font-weight: 400;
  font-size: 18;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.72px;
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));

  display: flex;
  align-items: center;
  justify-content: ${({ $position }) =>
    $position === 'center' ? `center` : $position === 'left' ? `flex-start` : `flex-end`};
`;
