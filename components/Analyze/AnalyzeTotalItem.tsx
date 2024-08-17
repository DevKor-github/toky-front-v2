'use client';

import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';
import { AnalyzeItemProps } from './constants';

export default function AnalyzeTotalItem({ matchName, koreaWin, yonseiWin }: AnalyzeItemProps) {
  return (
    <Wrapper>
      <MatchNameContainer>{matchName}</MatchNameContainer>
      <BarContainer>
        <KoreaBar $ratio={koreaWin / (koreaWin + yonseiWin)} />
        <YonseiBar $ratio={yonseiWin / (koreaWin + yonseiWin)} />
      </BarContainer>
      <InfoContainer>
        <Flex $direction="column">
          <WinContainer>{koreaWin}승</WinContainer>
          <UnivContainer>고려대학교</UnivContainer>
        </Flex>
        <Flex $direction="column" $justify="flex-end">
          <WinContainer style={{ marginLeft: 'auto' }}>{yonseiWin}승</WinContainer>
          <UnivContainer>연세대학교</UnivContainer>
        </Flex>
      </InfoContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 104px;
  width: 350px;
  color: rgba(255, 255, 255, 0.87);
  font-weight: 700;
  font-size: 16px;
  line-height: 20.03px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MatchNameContainer = styled.div`
  position: relative;
  top: 13px;
`;

const BarContainer = styled.div`
  position: relative;
  top: 26px;
  height: 12px;
  width: 350px;

  display: flex;
`;

const KoreaBar = styled.div<{ $ratio: number }>`
  width: ${({ $ratio }) => $ratio * 100}%;
  height: 100%;
  background: linear-gradient(270deg, #f3233c 0%, rgba(243, 35, 60, 0.25) 100%);
  border-radius: 34px 0px 0px 34px;
`;

const YonseiBar = styled.div<{ $ratio: number }>`
  width: ${({ $ratio }) => $ratio * 100}%;
  height: 100%;
  background: linear-gradient(270deg, rgba(41, 72, 255, 0.25) 0%, #2948ff 100%);
  border-radius: 0px 34px 34px 0px;
`;

const InfoContainer = styled.div`
  position: relative;

  top: 34px;
  width: 350px;
  height: 40px;

  display: flex;
  justify-content: space-between;
`;

const WinContainer = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 23px;
`;
const UnivContainer = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
`;
