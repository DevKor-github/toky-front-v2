'use client';

import styled from 'styled-components';
import { useState, useCallback } from 'react';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import { SelectionType } from '@/libs/constants/sports';
import PlayerCard from '@/components/PlayerCard';
import { PlayerCardContainer } from '@/components/Analyze/PlayerCardContainer';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import { KOREA_PLAYER_CARD_LIST, YONSEI_PLAYER_CARD_LIST } from '../constants';

export default function AnalyzeDetails() {
  const searchParams = useSearchParams();
  const sportsType = searchParams.get('sports') ?? 'baseball';

  const [curNav, setCurNav] = useState<Exclude<SelectionType, 'all'>>(sportsType as Exclude<SelectionType, 'all'>);
  const handleNav = useCallback((selection: SelectionType) => {
    if (selection === 'all') return;
    setCurNav(selection);
  }, []);

  const [scale, setScale] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setScale(window.innerWidth / 390);
    }
  }, []);

  const koreaPlayers = curNav != 'rugby' ? KOREA_PLAYER_CARD_LIST[curNav] : [];
  const yonseiPlayers = curNav != 'rugby' ? YONSEI_PLAYER_CARD_LIST[curNav] : [];

  return (
    <div>
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
            {koreaPlayers.map((player, index) => (
              <PlayerCard key={`${player.image}-${index}`} scale={scale} {...player} />
            ))}
          </PlayerCardContainer>
          <PlayerCardContainer school="연세대학교" scale={scale}>
            {yonseiPlayers.map((player, index) => (
              <PlayerCard key={`${player.image}-${index}`} scale={scale} {...player} />
            ))}
          </PlayerCardContainer>
        </ContentsWrapper>
      </Wrapper>
    </div>
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
