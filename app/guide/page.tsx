'use client';
import { GuideSelectionBar } from '../../components/GuideSelectionBar';
import Header from '../../components/Header';
import { Flex } from '../../libs/design-system/flex';
import { Icon } from '../../libs/design-system/icons';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { GUIDE_INFO } from './constants';
import { ScheduleSmallCard } from '../../components/ScheduleCard';

export default function Guide() {
  const [guideType, setGuideType] = useState<'period' | 'service'>('period');
  const SCHDEULE = GUIDE_INFO;
  function changeType(type: 'period' | 'service') {
    setGuideType(type);
  }

  return (
    <>
      <Header title="TOKY 이용 가이드" withSideBar />
      <Wrapper>
        <Banner>
          <KoreaLogo src="/api/image-proxy/guide/korea_symbol.png" width={130} height={221} alt={'Korea Univ Logo'} />
          <YonseiLogo
            src="/api/image-proxy/guide/yonsei_symbol.png"
            width={144}
            height={205}
            alt={'Yonsei Univ Logo'}
          />
          <TokyImage
            src="/api/image-proxy/guide/toky_guide_banner.png"
            priority={true}
            alt={'Toky Image'}
            fill={true}
          />
          <Shadow />
          <Flex $direction="column" $align="center" $gap={11} style={{ position: 'relative' }}>
            <SubTitle>2024 정기전 토키</SubTitle>
            <Flex $direction="column" $align="center">
              <Title>활용가이드</Title>
              <Flex $gap={6}>
                <Title>&</Title>
                <Title>운영기간안내</Title>
              </Flex>
            </Flex>
          </Flex>
        </Banner>
        <GuideSelectionBar type={guideType} setType={changeType} />
        <BetWrapper>
          <Flex $direction="column" $align="center" $gap={8}>
            <SectionTitle>승부예측</SectionTitle>
            <Flex $direction="column" $align="flex-end">
              <Flex $gap={6}>
                <InfoText>09.09(금)</InfoText>
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
                  <Text>농구</Text>
                  <Icon.Dot size={2} />
                  <Text>빙구 마감</Text>
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
                  <Text>럭비</Text>
                  <Icon.Dot size={2} />
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
        </BetWrapper>
      </Wrapper>
    </>
  );
}
const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.space.mainTopBarHeight}px;
  overflow-x: hidden;
`;
const Banner = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 390 /426;
  background: linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, rgba(65, 17, 144, 0.56) 100%);
  padding-top: 31px;
`;
const Shadow = styled.div`
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0) 53.31%);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
`;
const KoreaLogo = styled(Image)`
  position: absolute;
  left: 0px;
  bottom: 18px;
`;
const YonseiLogo = styled(Image)`
  position: absolute;
  right: 0px;
  bottom: 32px;
`;
const TokyImage = styled(Image)`
  position: absolute;
  bottom: 0;
  object-fit: cover;
`;
const SubTitle = styled.h3`
  font-family: 'yoon-meoli-2s-sten-variable';
  color: #fff;
  text-align: center;
  font-size: 20.6px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  font-family: 'yoon-meoli-2s-sten-variable';
  font-size: 36.6px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -1.464px;
`;

const BetWrapper = styled.div`
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
