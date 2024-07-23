'use client';

import MainTopBar from '@/components/MainTopBar';
import MainCarousel from '@/components/MainCarousel';
import styled from 'styled-components';

export default function Home() {
  return (
    <div>
      <MainTopBar />
      <Wrapper>
        <MainCarousel />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: 66px;
`;
