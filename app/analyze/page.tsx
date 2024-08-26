'use client';

import ActionButton from '@/components/ActionButton';
import { AnalyzeTotal, AnalyzeMatch, MatchInfo } from '@/components/Analyze';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import { Timer } from '@/components/Timer/Timer';
import { LastDate, SelectionType } from '@/libs/constants/sports';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

export default function Analyze() {
  const [curNav, setCurNav] = useState<SelectionType>('All');
  const handleNav = useCallback((selection: SelectionType) => {
    setCurNav(selection);
  }, []);

  return (
    <>
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
        <Banner $backgroundUrl="/image-proxy/test-5-0.png">
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
          {curNav === 'All' ? <Timer expiryTimestamp={LastDate} /> : <MatchInfo match={curNav} />}
        </Banner>
        {curNav === 'All' ? <AnalyzeTotal /> : <AnalyzeMatch match={curNav} />}
      </Wrapper>
    </>
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
