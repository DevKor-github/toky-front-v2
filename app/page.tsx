'use client';

import MainTopBar from '@/components/MainTopBar';
import styled from 'styled-components';

export default function Home() {
  return (
    <div>
      <MainTopBar />
      <Wrapper>
        <div>test</div>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: 68px;
`;
