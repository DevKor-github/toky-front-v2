'use client';

import styled from 'styled-components';

import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useShareModal } from '@/components/ShareModal';
import PredictionBanner from '@/components/PredictionBanner';

export default function Bets() {
  const { openShareModal } = useShareModal();
  async function openModal() {
    await openShareModal();
  }

  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <PredictionBanner shareHandler={openModal} />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
`;
