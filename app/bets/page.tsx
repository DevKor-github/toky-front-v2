'use client';

import styled from 'styled-components';

import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useShareModal } from '@/components/ShareModal';
import PredictionBanner from '@/components/PredictionBanner';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import { useCallback, useState } from 'react';
import { SelectionType } from '@/components/SportsSelectionBar/constants';

export default function Bets() {
  const { openShareModal } = useShareModal();

  // "Baseball" | "Soccer" | "Basketball" | "Rugby" | "Hockey"로 관리
  const [curNav, setCurNav] = useState<SelectionType>('Baseball');

  async function openModal() {
    await openShareModal();
  }

  const handleNav = useCallback((selection: SelectionType) => {
    setCurNav(selection);
  }, []);

  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <PredictionBanner shareHandler={openModal} />
        <SportsSelectionBar curSelection={curNav} handleSelect={handleNav} isSticky />
        <DummyScroll />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
`;

// TODO: 지우기
const DummyScroll = styled.div`
  width: 10px;
  height: 500vh;
`;
