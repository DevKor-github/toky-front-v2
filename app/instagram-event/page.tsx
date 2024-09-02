'use client';
import Header from '@/components/Header';
import { Flex } from '@/libs/design-system/flex';
import Image from 'next/image';
import styled from 'styled-components';
import { Autoplay, FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function InstagramEvent() {
  const swiperImage = [
    '/image-proxy/instagram-event/test.png',
    '/image-proxy/instagram-event/test.png',
    '/image-proxy/instagram-event/test.png',
    '/image-proxy/instagram-event/test.png',
    '/image-proxy/instagram-event/test.png',
    '/image-proxy/instagram-event/test.png',
    '/image-proxy/instagram-event/test.png',
    '/image-proxy/instagram-event/test.png',
  ];
  return (
    <>
      <Header title="내 예측 인스타로 공유하기" withSideBar />
      <Wrapper>
        <Banner>
          <Flex $direction="column" $align="center" style={{ position: 'relative' }}>
            <Flex $direction="column" $align="center" style={{ marginBottom: 28 }}>
              <Title>인스타그램</Title>
              <Title>카드 공유하기</Title>
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
        <Flex $direction="column" style={{ padding: '40px 20px 60px 20px' }} $gap={40} $align="center">
          <Flex $direction="column" $align="center" $gap={8}>
            <Title>
              인스타그램으로
              <br />내 예측 공유하기
            </Title>
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
