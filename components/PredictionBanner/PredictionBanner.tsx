'use client';

import styled from 'styled-components';
import ActionButton from '@/components/ActionButton';
import { Flex } from '@/libs/design-system/flex';
import Link from 'next/link';
import { Typo } from '@/libs/design-system/typo';

interface PredictionBannerProps {
  shareHandler: () => void;
}
export function PredictionBanner({ shareHandler }: PredictionBannerProps) {
  return (
    <Wrapper>
      <Title>
        <Typo.BetSubTitle />
        <Typo.BetTitle />
      </Title>
      <Flex $gap="6px">
        <Link href="/analyze">
          <ActionButton color="white" bgColor="#FFFFFF26" fontSize="14px" padding="8px 16px" borderRadius="99px">
            더 알아보기
          </ActionButton>
        </Link>
        <ActionButton
          color="white"
          bgColor="linear-gradient(90deg, rgba(134, 0, 240, 0.80) -12.75%, rgba(70, 0, 183, 0.80) 113.73%)"
          fontSize="14px"
          padding="8px 16px"
          borderRadius="99px"
          fontWeight="700"
          onClick={shareHandler}
        >
          내 예측 공유하기
        </ActionButton>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.space.predictionBannerHeight}px;
  background: linear-gradient(90deg, rgba(76, 14, 176, 0.4) 0%, rgba(76, 14, 176, 0.24) 100%),
    linear-gradient(0deg, rgba(18, 18, 18, 0.15) 0%, rgba(18, 18, 18, 0) 100%);
  padding-top: 30px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 19.71px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4.71px;
  color: white;
`;
