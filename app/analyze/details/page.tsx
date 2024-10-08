'use client';

import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useState, useCallback } from 'react';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import { SelectionType } from '@/libs/constants/sports';
import PlayerCard from '@/components/PlayerCard';
import { PlayerCardContainer } from '@/components/Analyze/PlayerCardContainer';
import Header from '@/components/Header';
import { KOREA_PLAYER_CARD_LIST, YONSEI_PLAYER_CARD_LIST } from '../constants';
import { RipRugby } from '@/components/RipRugby/RipRugby';

export default function AnalyzeDetails() {
  const searchParams = useSearchParams();
  const sports = searchParams.get('sports') as SelectionType | null;

  const [curNav, setCurNav] = useState<Exclude<SelectionType, 'all'>>(
    sports ? (sports as Exclude<SelectionType, 'all'>) : 'baseball',
  );
  const handleNav = useCallback((selection: SelectionType) => {
    if (selection === 'all') return;
    setCurNav(selection);
  }, []);

  const [scale, setScale] = useState<number>(typeof window !== 'undefined' ? window.innerWidth / 390 : 1);

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
        {curNav === 'rugby' && <RipRugby />}
        {curNav !== 'rugby' && (
          <ContentsWrapper scale={scale}>
            <PlayerCardContainer school="고려대학교" scale={scale} caption="SPORTS KU 제공">
              {koreaPlayers.map((player, index) => (
                <PlayerCard key={`${player.image}-${index}`} scale={scale} {...player} />
              ))}
            </PlayerCardContainer>
            <PlayerCardContainer school="연세대학교" scale={scale} caption="연세대학교 스포츠매거진 시스붐바 제공">
              {yonseiPlayers.map((player, index) => (
                <PlayerCard key={`${player.image}-${index}`} scale={scale} {...player} />
              ))}
            </PlayerCardContainer>
          </ContentsWrapper>
        )}
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
