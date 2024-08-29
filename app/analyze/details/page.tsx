'use client';

import styled from 'styled-components';
import { useState, useCallback } from 'react';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import { SelectionType } from '@/libs/constants/sports';
import { PLAYER_CARD_LIST } from './constants';
import PlayerCard from '@/components/PlayerCard';
import { PlayerCardContainer } from '@/components/Analyze/PlayerCardContainer';
import { useEffect } from 'react';
import Header from '@/components/Header';

export default function AnalyzeDetails() {
  const [curNav, setCurNav] = useState<SelectionType>('all');
  const handleNav = useCallback((selection: SelectionType) => {
    setCurNav(selection);
  }, []);

  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScale(window.innerWidth / 390);
    }
  }, []);

  return (
    <>
      <Header title="선수 정보" withSideBar={true} />
      <Wrapper>
        <SportsSelectionBar
          curSelection={curNav}
          handleSelect={handleNav}
          hasUnderbar={true}
          showAll={false}
          bgColor="var(--black_0, #121212)"
          isSticky={true}
        />
        <ContentsWrapper scale={scale}>
          <PlayerCardContainer school="고려대학교" scale={scale}>
            {PLAYER_CARD_LIST.map((player, index) => (
              <PlayerCard key={index} scale={scale} {...player} />
            ))}
          </PlayerCardContainer>
          <PlayerCardContainer school="연세대학교" scale={scale}>
            {PLAYER_CARD_LIST.map((player, index) => (
              <PlayerCard key={index} scale={scale} {...player} />
            ))}
          </PlayerCardContainer>
        </ContentsWrapper>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.navigationBarHeight}px;
  position: relative;
  & nav {
    position: absolute;
    top: ${(props) => props.theme.space.navigationBarHeight}px;
    width: 100%;
  }
`;

const ContentsWrapper = styled.div<{ scale: number }>`
  position: absolute;
  top: ${(props) => props.theme.space.sportsSelectionBarHeight + props.theme.space.navigationBarHeight}px;
  padding: 24px ${(props) => 20 * props.scale}px 0 ${(props) => 20 * props.scale}px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1 0 0;
`;
