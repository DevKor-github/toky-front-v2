'use client';
import { GuideSelectionBar } from '@/components/Guide/GuideSelectionBar';
import { OperationPeriod } from '@/components/Guide/OperationPeriod';
import { OperationService } from '@/components/Guide/OperationService';
import Header from '@/components/Header';
import { Flex } from '@/libs/design-system/flex';
import { Typo } from '@/libs/design-system/typo';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';

export default function Guide() {
  const [guideType, setGuideType] = useState<'period' | 'service'>('period');
  function changeType(type: 'period' | 'service') {
    setGuideType(type);
  }

  return (
    <>
      <Header title="TOKY 이용 가이드" withSideBar />
      <Wrapper>
        <Banner>
          <KoreaLogo src="/image-proxy/guide/korea_symbol.png" width={130} height={221} alt={'Korea Univ Logo'} />
          <YonseiLogo src="/image-proxy/guide/yonsei_symbol.png" width={144} height={205} alt={'Yonsei Univ Logo'} />
          <TokyImage src="/image-proxy/guide/info_banner.png" priority={true} alt={'Toky Image'} fill={true} />
          <Shadow />
          <Flex $direction="column" $align="center" $gap={10} style={{ position: 'relative' }}>
            <Typo.GuideBanner />
            <Text>토키와 함께 더 즐거운 정기전을!</Text>
          </Flex>
        </Banner>
        <GuideSelectionBar type={guideType} setType={changeType} />
        {guideType === 'period' ? <OperationPeriod /> : <OperationService />}
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
  aspect-ratio: 390 /426;
  background: linear-gradient(180deg, rgba(18, 18, 18, 0) 0%, rgba(65, 17, 144, 0.56) 100%);
  padding-top: 25px;
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

const Text = styled.h4`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.56px;
`;
