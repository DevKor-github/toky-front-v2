'use client';

import MainTopBar from '@/components/MainTopBar';
import MainCarousel from '@/components/MainCarousel';
import styled from 'styled-components';
import { Flex } from '@/libs/design-system/flex';
import IconButton from '@/components/IconButton';
import { ICON_INFO_LIST } from './constants';

export default function Home() {
  return (
    <div>
      <MainTopBar />
      <Wrapper>
        <MainCarousel />
        <Flex $justify="space-between" style={{ padding: '32px' }}>
          {ICON_INFO_LIST.map((iconInfo) => (
            <IconButton key={`${iconInfo.href}-${iconInfo.icon}`} {...iconInfo} />
          ))}
        </Flex>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: 66px;
  background-color: ${({ theme }) => theme.colors.background};
`;
