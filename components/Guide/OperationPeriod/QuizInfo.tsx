import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import { position } from 'html2canvas/dist/types/css/property-descriptors/position';
import Image from 'next/image';
import styled from 'styled-components';

export function QuizInfo() {
  return (
    <Wrapper>
      <LeftBackground>
        <Icon.AttendanceQuizLeftBackground />
      </LeftBackground>
      <RightBackground>
        <Icon.AttendanceQuizRightBackground />
      </RightBackground>
      <Content>
        <Flex $direction="column" $align="center" $gap={8}>
          <SectionTitle>출석퀴즈</SectionTitle>
          <Flex $gap={6}>
            <InfoText>09.09(금)</InfoText>
            <InfoText>- </InfoText>
            <InfoText>09.28(토)</InfoText>
          </Flex>
        </Flex>
        <Flex $direction="column" $gap={10} style={{ width: ' 100%', maxWidth: 295 }}>
          <Flex $justify="space-between" style={{ width: ' 100%' }}>
            <Text>오늘의 QUIZ를 풀 때마다</Text>
            <Flex $gap={6} $align="center">
              <Icon.Plus />
              <Icon.Ticket size={21} />
              <Text>1장</Text>
            </Flex>
          </Flex>
          <Flex $justify="space-between" style={{ width: ' 100%' }}>
            <Text>오늘의 QUIZ 정답 시</Text>
            <Flex $gap={6} $align="center">
              <Icon.Plus />
              <Icon.Ticket size={21} />
              <Text>1장</Text>
            </Flex>
          </Flex>
        </Flex>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  overflow-x: hidden;
`;
const SectionTitle = styled.h2`
  text-align: center;
  font-family: 'YoonA Meolijeongche2S Stencil Variable';
  font-size: 48px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0.5) 100%);
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

const LeftBackground = styled.div`
  position: absolute;
  left: -26px;
  top: 128px;
`;
const RightBackground = styled.div`
  position: absolute;
  right: -30px;
  top: -28px;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 20px 50px 20px;
  gap: 40px;
  align-items: center;
`;

const Text = styled.div`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));

  /* Label1_b */
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 24px */
  letter-spacing: -0.64px;
`;
