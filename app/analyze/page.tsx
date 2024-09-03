'use client';

import ActionButton from '@/components/ActionButton';
import { AnalyzeTotal, AnalyzeMatch, MatchInfo } from '@/components/Analyze';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import PlayerCard from '@/components/PlayerCard';
import PlayerCarousel from '@/components/PlayerCarousel';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import { Timer } from '@/components/Timer/Timer';
import { LastDate, SelectionType } from '@/libs/constants/sports';
import { Flex } from '@/libs/design-system/flex';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BANNER_INFO, KOREA_PLAYER_CARD_LIST, YONSEI_PLAYER_CARD_LIST } from './constants';
import Link from 'next/link';
import { Icon } from '@/libs/design-system/icons';

export default function Analyze() {
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

  const koreaPlayers = curNav != 'rugby' && curNav != 'all' ? KOREA_PLAYER_CARD_LIST[curNav] : [];
  const yonseiPlayers = curNav != 'rugby' && curNav != 'all' ? YONSEI_PLAYER_CARD_LIST[curNav] : [];

  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <SportsSelectionBar
          curSelection={curNav}
          handleSelect={handleNav}
          hasUnderbar={false}
          showAll
          bgColor="linear-gradient(180deg, rgba(18, 18, 18, 0.80) 0%, rgba(18, 18, 18, 0.00) 100%);"
        />
        {curNav === 'rugby' && <></>}
        {curNav !== 'rugby' && (
          <>
            <Banner $backgroundUrl={BANNER_INFO[curNav]} key={BANNER_INFO[curNav]}>
              <ButtonWrapper>
                <ActionButton
                  color="#121212"
                  bgColor="rgba(255, 255, 255, 0.87)"
                  padding="8px 16px"
                  borderRadius="99px"
                  fontWeight="700"
                  href="/bets"
                >
                  승부예측하러 가기
                </ActionButton>
              </ButtonWrapper>
              {curNav === 'all' ? <Timer expiryTimestamp={LastDate} /> : <MatchInfo match={curNav} />}
            </Banner>
            {curNav === 'all' ? <AnalyzeTotal /> : <AnalyzeMatch match={curNav} />}
            {curNav !== 'all' && (
              <>
                <div style={{ height: 16, width: '100%', backgroundColor: '#1F1F1F' }} />
                <CarouselWrapper>
                  <Flex $justify="space-between" $align="center" style={{ paddingLeft: 20, paddingRight: 14 }}>
                    <PlayerInfo>선수정보</PlayerInfo>
                    <MorePlayerInfo href={`/analyze/details?sports=${curNav}`}>
                      자세히 보기
                      <Icon.ChevronForward />
                    </MorePlayerInfo>
                  </Flex>
                  <div style={{ marginTop: 15 }}>
                    <PlayerCarousel>
                      {koreaPlayers.map((player, index) => (
                        <PlayerCard key={`${player.image}-${index}`} scale={scale} {...player} />
                      ))}
                    </PlayerCarousel>
                    <Caption>SPORTS KU 제공</Caption>

                    <div style={{ height: 16 }} />
                    <PlayerCarousel>
                      {yonseiPlayers.map((player, index) => (
                        <PlayerCard key={`${player.image}-${index}`} scale={scale} {...player} />
                      ))}
                    </PlayerCarousel>
                    <Caption>연세대학교 스포츠매거진 시스붐바 제공</Caption>
                  </div>
                </CarouselWrapper>
              </>
            )}
          </>
        )}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
  position: relative;
  & nav {
    position: absolute;
    width: 100%;
  }
`;

const Banner = styled.div<{ $backgroundUrl: string }>`
  width: 100%;
  aspect-ratio: 390/244;
  position: relative;
  background: url(${(props) => props.$backgroundUrl}) no-repeat center;
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 28px;
`;

const CarouselWrapper = styled.div`
  padding-top: 30px;
  padding-bottom: 32px;
`;

const PlayerInfo = styled.p`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  /* Title1_b150 */
  font-family: 'Spoqa Han Sans Neo';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 30px */
  letter-spacing: -0.8px;
`;

const MorePlayerInfo = styled(Link)`
  display: flex;
  gap: 4px;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  text-align: right;
  /* Label2_r */
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.56px;
  & svg {
    width: 18px;
    height: 18px;
  }
`;

const Caption = styled.p`
  margin-top: 8px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.56px;
  text-align: right;
  padding-right: 10px;
`;
