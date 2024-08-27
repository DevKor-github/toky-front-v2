import { Flex } from '@/libs/design-system/flex';
import Image from 'next/image';
import styled, { css } from 'styled-components';

export function DrawInfo() {
  return (
    <Wrapper>
      <Flex $direction="column" $align="center" $gap={8}>
        <SectionTitle>승부예측</SectionTitle>
        <Flex $gap={6}>
          <InfoText>09.09(금)</InfoText>
          <InfoText>- </InfoText>
          <InfoText>10.05(토)</InfoText>
        </Flex>
      </Flex>
      <Flex $gap={15} $justify="center" $align="center">
        <Flex $direction="column" $align="center" $gap={10}>
          <DrawContent $isPrimary={false}>
            <Image src="/image-proxy/guide/baemin.png" width={100} height={114} alt="baemin" />
          </DrawContent>
          <LimitText>
            <Image src="/image-proxy/guide/coin.png" width={14} height={14} alt="coin" />
            20명 추첨
          </LimitText>
        </Flex>
        <Flex $direction="column" $align="center" $gap={10}>
          <DrawContent $isPrimary>
            <Image src="/image-proxy/guide/watch.png" width={120} height={138} alt="baemin" />
          </DrawContent>
          <LimitText>
            <Image src="/image-proxy/guide/coin.png" width={14} height={14} alt="coin" />
            1명 추첨
          </LimitText>
        </Flex>
        <Flex $direction="column" $align="center" $gap={10}>
          <DrawContent $isPrimary={false}>
            <Image src="/image-proxy/guide/starbucks.png" width={100} height={114} alt="baemin" />
          </DrawContent>
          <LimitText>
            <Image src="/image-proxy/guide/coin.png" width={14} height={14} alt="coin" />
            20명 추첨
          </LimitText>
        </Flex>
      </Flex>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background: linear-gradient(0deg, rgba(59, 0, 225, 0) 34.53%, rgba(59, 0, 225, 0.15) 100%), #121212;
  display: flex;
  flex-direction: column;
  padding: 40px 20px 50px 20px;
  gap: 30px;
  overflow-x: hidden;
`;
const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'YoonA Meolijeongche2S Stencil Variable';
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: linear-gradient(180deg, #d8caee 13.64%, #ae93db 118.94%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
const InfoText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
`;

const DrawContent = styled.div<{ $isPrimary: boolean }>`
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  ${({ $isPrimary }) =>
    $isPrimary
      ? css`
          width: 120px;
          height: 138px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.05) 100%);
        `
      : css`
          width: 100px;
          height: 114px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%);
        `};
`;

const LimitText = styled.div`
  display: flex;
  padding: 4px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 5px;
  background: var(--Purple-Gradient, linear-gradient(90deg, #c33def -12.75%, #672bf3 113.73%));

  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.52px;
`;
