'use client';

import ActionButton from '@/components/ActionButton';
import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';

export function PredictionBanner() {
  return (
    <Wrapper>
      <Title>
        {/* TODO: 저작권 명확히 한 후, SVG 또는 웹폰트 적용 */}
        <div style={{ fontSize: '16px' }}>2024 정기전 토키</div>
        <div style={{ fontSize: '43.5px' }}>승부예측</div>
      </Title>
      {/* TODO: 버튼에 액션 적용 */}
      <Flex $gap="6px">
        <ActionButton color="white" bgColor="#FFFFFF26" fontSize="14px" padding="8px 16px" borderRadius="99px">
          더 알아보기
        </ActionButton>
        <ActionButton
          color="white"
          bgColor="linear-gradient(90deg, rgba(134, 0, 240, 0.80) -12.75%, rgba(70, 0, 183, 0.80) 113.73%)"
          fontSize="14px"
          padding="8px 16px"
          borderRadius="99px"
          fontWeight="700"
        >
          내 예측 공유하기
        </ActionButton>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 170px;
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
