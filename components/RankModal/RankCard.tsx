'use client';
import { RankInfo } from '@/libs/apis/bets';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import { ForwardedRef, forwardRef } from 'react';
import styled from 'styled-components';

interface PredictionCardProps {
  src: string;
  rankInfo: RankInfo;
}

export function PredictionCardFC({ rankInfo, src }: PredictionCardProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <>
      {src && rankInfo ? (
        <RankCardWrapper ref={ref}>
          <RankCard>
            <UserContainer>{rankInfo.name}님은</UserContainer>
            <PercentContainer>적중률 상위 {rankInfo?.rankPercentage ?? 5}%</PercentContainer>

            <RankContainer>
              <TotalRank>{rankInfo.participants} 중</TotalRank>
              <Rank>{rankInfo.rank}등</Rank>
            </RankContainer>
            <ShareFooter>
              <p>2024 정기전 승부예측 토키</p>
              <Icon.Divider />
              <p>@official.toky</p>
            </ShareFooter>
            <CharacterImage key={src} src={src} alt="character" />
          </RankCard>
        </RankCardWrapper>
      ) : (
        <div ref={ref}></div>
      )}
    </>
  );
}

export default forwardRef(PredictionCardFC);

const CharacterImage = styled.img`
  width: 289px;
  vertical-align: 'bottom';
  z-index: 1000;
  border-radius: 15px;
  position: absolute;
  bottom: 0%;
`;

const UserContainer = styled.div`
  z-index: 1002;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 50px;
  line-height: 27px;
  text-align: center;
  color: white;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.56px;
`;

const PercentContainer = styled.div`
  border-radius: 26px;
  z-index: 1002;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
  margin-top: 74px;
  padding: 4px 19px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.56px;
  background-color: ${({ theme }) => theme.colors.white60};
`;

const RankCard = styled.div`
  position: relative;
  border-radius: 15px;
  width: 289px;
  height: 430px;
  flex-shrink: 0;
  color: white;
  background-color: transparent;
  & h3 {
    font-size: 14px;
    font-family: Spoqa Han Sans Neo;
    font-weight: 500;
    letter-spacing: -0.56px;
    text-align: center;
  }
`;

const ShareFooter = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: 20px;
  transform: translate(-50%, 0);
  z-index: 1002;
  display: flex;
  justify-content: center;
  gap: 7px;

  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.6px;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.3);
`;

const RankCardWrapper = styled.div`
  width: 400px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

const RankContainer = styled.div`
  position: absolute;
  width: 100%;
  left: 50%;
  bottom: 62px;
  transform: translate(-50%, 0);
  z-index: 1002;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TotalRank = styled.div`
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.6px;
`;

const Rank = styled.div`
  color: white;
  text-align: center;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
