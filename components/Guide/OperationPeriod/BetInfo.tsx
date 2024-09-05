import { GUIDE_INFO } from '@/app/guide/constants';
import { ScheduleSmallCard } from '@/components/ScheduleCard';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import { Typo } from '@/libs/design-system/typo';
import styled from 'styled-components';

export function BetInfo() {
  const SCHDEULE = GUIDE_INFO;

  return (
    <Wrapper>
      <Flex $direction="column" $align="center" $gap={8}>
        <Typo.GuideBetTitle />
        <Flex $direction="column" $align="flex-end">
          <Flex $gap={6}>
            <InfoText>09.09(월)</InfoText>
            <InfoText>- </InfoText>
            <InfoText>경기 종료 시까지</InfoText>
          </Flex>
          <Caption>*각 종목별 상이</Caption>
        </Flex>
      </Flex>
      <Flex $direction="column" $gap={30}>
        <Flex $direction="column" $gap={6} style={{ width: '100%' }}>
          <Flex $gap={10}>
            <Flex $gap={4} style={{ padding: '0 4px' }} $align="center ">
              <Text>야구</Text>
              <Icon.Dot size={2} />
              <Text>빙구</Text>
              <Icon.Dot size={2} />
              <Text>농구 마감</Text>
            </Flex>
            <Text style={{ color: '#CC84FF' }}>9/27(금)</Text>
          </Flex>
          <Flex $gap={10} style={{ width: '100%' }}>
            {SCHDEULE.slice(0, 3).map((schedule) => (
              <ScheduleSmallCard
                key={schedule.title}
                title={schedule.title}
                time={schedule.time}
                backgroundImage={schedule.imageUrl}
              />
            ))}
          </Flex>
        </Flex>
        <Flex $direction="column" $gap={6} style={{ width: '100%' }}>
          <Flex $gap={10}>
            <Flex $gap={4} style={{ padding: '0 4px' }} $align="center ">
              <Text>축구 마감</Text>
            </Flex>
            <Text style={{ color: '#CC84FF' }}>9/28(토)</Text>
          </Flex>
          <Flex $gap={10} style={{ width: '100%' }}>
            {SCHDEULE.slice(3, 5).map((schedule) => (
              <ScheduleSmallCard
                key={schedule.title}
                title={schedule.title}
                time={schedule.time}
                backgroundImage={schedule.imageUrl}
              />
            ))}
          </Flex>
        </Flex>
        <Flex $direction="column">
          <Warning>- 경기가 시작되면 승부예측을 이용할 수 없습니다</Warning>
          <Warning>- 마감시간 전까지 승부예측을 꼭 완료해주세요</Warning>
        </Flex>
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 40px 20px;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  gap: 40px;
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
const Caption = styled.div`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-size: 9px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Warning = styled.p`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.48px;
`;

const Text = styled.div`
  color: white;
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.72px;
`;
