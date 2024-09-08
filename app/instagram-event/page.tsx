'use client';
import Header from '@/components/Header';
import { Flex } from '@/libs/design-system/flex';
import { Typo } from '@/libs/design-system/typo';
import Image from 'next/image';
import styled from 'styled-components';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const swiperImage = [
  '/image-proxy/instagram-event/card1.png',
  '/image-proxy/instagram-event/card2.png',
  '/image-proxy/instagram-event/card3.png',
  '/image-proxy/instagram-event/card4.png',
  '/image-proxy/instagram-event/card5.png',
  '/image-proxy/instagram-event/card6.png',
];
const cardPercentage = [1, 5, 10, 30];

export default function InstagramEvent() {
  return (
    <>
      <Header title="내 예측 인스타로 공유하기" withSideBar />
      <Wrapper>
        <Banner>
          <Flex $direction="column" $align="center" style={{ position: 'relative' }}>
            <Flex $direction="column" $align="center" style={{ marginBottom: 28 }}>
              <Typo.ShareInstagram />
            </Flex>
            <Image src="/image-proxy/instagram-event/banner.png" width={244} height={186} alt="banner" />
          </Flex>
          <SwiperWrapper
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            centeredSlides={true}
            allowTouchMove={false}
            loop={true}
            slidesPerView={'auto'}
            freeMode={true}
            speed={5000}
            modules={[Autoplay]}
            navigation={false}
            spaceBetween={10}
          >
            {swiperImage.map((image, index) => (
              <SwiperSlideWrapper key={index}>
                <Image src={image} width={96} height={142} alt="image" />
              </SwiperSlideWrapper>
            ))}
          </SwiperWrapper>
        </Banner>
        <Flex
          $direction="column"
          $align="center"
          style={{
            padding: '30px 20px 40px 20px',
            background:
              'var(--Background-3, linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%), #121212)',
          }}
        >
          <Flex
            $direction="column"
            $gap={20}
            style={{
              maxWidth: '345px',
            }}
          >
            <RankingHeader>
              <h2>랭킹별 특별 카드</h2>
              <p>승부예측 순위에 따라 특별한 공유카드를 받을 수 있어요</p>
            </RankingHeader>
            <RankingCardsWrapper>
              {Array(2)
                .fill(true)
                .map((_, rowIndex) => (
                  <RankingCardsRow key={`${rowIndex} row`}>
                    {Array(2)
                      .fill(true)
                      .map((_, cardIndex) => (
                        <CardWrapper key={`${rowIndex}-${cardIndex}`}>
                          <Card>
                            <StyledImage
                              src={`/image-proxy/guide/card${rowIndex * 2 + cardIndex + 1}.png`}
                              alt={`instagram card ${rowIndex * 2 + cardIndex + 1}`}
                              fill
                            />
                          </Card>
                          <CardToken>
                            <Image src={'/image-proxy/guide/coin.png'} alt="coin" width={14} height={14} />
                            <p>상위 {cardPercentage[rowIndex * 2 + cardIndex]}%</p>
                          </CardToken>
                        </CardWrapper>
                      ))}
                  </RankingCardsRow>
                ))}
            </RankingCardsWrapper>
          </Flex>
        </Flex>
        <Flex $direction="column" style={{ padding: '40px 20px 60px 20px' }} $gap={40} $align="center">
          <Flex $direction="column" $align="center" $gap={8}>
            <Typo.SharePredictionTypo />
            <Flex $gap={6}>
              <InfoText>09.09(금)</InfoText>
              <InfoText>- </InfoText>
              <InfoText>09.28(토)</InfoText>
            </Flex>
          </Flex>
          <EventWrapper>
            <StarbucksEvent>
              <Subtitle>스타벅스 아메리카노(10명)</Subtitle>
              <EventInfo>
                공식 계정을 태그하고(@official_toky)
                <br /> 인스타그램 스토리를 업로드한 분들 중 <br /> 10분을 추첨하여 상품을 드립니다.
              </EventInfo>
            </StarbucksEvent>
            <StarbucksImage src="/image-proxy/instagram-event/starbucks.png" width={129} height={144} alt="starbucks" />
          </EventWrapper>
        </Flex>
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
  padding-bottom: 40px;
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

const Subtitle = styled.h4`
  color: #fff;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.72px;
`;
const InfoText = styled.p`
  color: #fff;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
`;

const SwiperWrapper = styled(Swiper)`
  width: 100%;
  overflow: hidden;
  .swiper-wrapper {
    display: flex;
    -webkit-transition-timing-function: linear !important;
    -o-transition-timing-function: linear !important;
    transition-timing-function: linear !important;
  }
`;
const SwiperSlideWrapper = styled(SwiperSlide)`
  width: 96px;
  height: 142px;
`;
const EventWrapper = styled.div`
  width: 100%;
  position: relative;
  max-width: 350px;
`;

const StarbucksEvent = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
  gap: 20px;
  border-radius: 10px;
  background: var(
    --Background-3,
    linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%),
    #121212
  );
  width: 254px;
  position: relative;
`;

const EventInfo = styled.p`
  color: #fff;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 19.5px */
  letter-spacing: -0.52px;
`;

const StarbucksImage = styled(Image)`
  position: absolute;
  bottom: 0;
  right: 0;
`;

const RankingHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  color: #fff;
  align-items: flex-start;
  & h2 {
    font-size: 20px;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.8px;
  }
  & p {
    font-size: 14px;
    font-weight: 400;
    line-height: 160%; /* 22.4px */
    letter-spacing: -0.56px;
  }
`;

const RankingCardsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
`;
const RankingCardsRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;
const CardWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`;
const CardToken = styled.div`
  display: flex;
  height: 24px;
  padding: 4px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 5px;
  background: var(--Purple-Gradient, linear-gradient(90deg, #c33def -12.75%, #672bf3 113.73%));
  & p {
    color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: -0.48px;
  }
`;
const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 13px;
  overflow: hidden;
  background: var(--Background-0, #121212);
`;

const StyledImage = styled(Image)`
  position: relative !important;
  height: unset !important;
`;
