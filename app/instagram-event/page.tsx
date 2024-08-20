'use client';
import Header from '@/components/Header';
import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';

export default function InstagramEvent() {
  return (
    <>
      <Header title="내 예측 인스타로 공유하기" withSideBar />
      <Wrapper>
        <Banner>
          <Flex $direction="column" $align="center" style={{ position: 'relative' }}>
            <Flex $direction="column" $align="center">
              <Title>인스타그램</Title>
              <Title>카드 공유하기</Title>
            </Flex>
          </Flex>
        </Banner>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.space.mainTopBarHeight}px;
`;
const Banner = styled.div`
  width: 100%;
  position: relative;
  background-color: ${({ theme }) => theme.colors.primary};
  padding-top: 29px;
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-family: 'yoon-meoli-2s-sten-variable';
  font-size: 37px;
  font-style: normal;
  font-weight: 400;
  line-height: 50px;
  letter-spacing: -1.464px;
`;

const Text = styled.h4`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Happiness Sans';
  font-size: 14px;
  font-style: normal;
  font-weight: 900;
  line-height: normal;
  letter-spacing: -0.56px;
  margin-top: 10px;
`;
const SubTitle = styled.h3`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
`;
