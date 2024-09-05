'use client';

import React from 'react';
import styled from 'styled-components';
import { Flex } from '@/libs/design-system/flex';
import MainTopBar from '@/components/MainTopBar';
import MainCarousel from '@/components/MainCarousel';
import ActionCard from '@/components/ActionCard';
import IconButton from '@/components/IconButton';
import FreeModeCarousel from '@/components/FreeModeCarousel';
import ScheduleCard from '@/components/ScheduleCard';
import { ICON_INFO_LIST, SCHEDULE_INFO, MESSAGE_INFO, AD_BANNER_LIST } from './constants';
import { CopyInviteCode } from '@/components/CopyInviteCode/CopyInviteCode';
import { KakaoLogin } from '@/components/KakaoLogin';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';
import { SuspenseParamProvider } from '@/libs/client/ParamProvider';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { Autoplay, Pagination } from 'swiper/modules';
import { onClickKakaoLogin } from '@/libs/utils/kakaoLogin';

export default function Home() {
  const isLogin = useAuthStore((state) => state.isLogin);

  return (
    <div>
      <SuspenseParamProvider />
      <MainTopBar />
      <Wrapper>
        <MainCarousel />
        <Flex $justify="space-between" style={{ padding: 32 }}>
          {ICON_INFO_LIST.map((iconInfo) => (
            <IconButton key={`${iconInfo.href}-${iconInfo.icon}`} {...iconInfo} />
          ))}
        </Flex>
        <ActionCardWrapper>
          {isLogin ? (
            <ActionCard
              message={MESSAGE_INFO.inviteFriends}
              contents={<CopyInviteCode />}
              padding="16px 16px 16px 20px"
            />
          ) : (
            <ActionCard
              message={MESSAGE_INFO.kakaoLogin}
              contents={<KakaoLogin />}
              padding="16px 20px"
              onClick={onClickKakaoLogin}
            />
          )}
        </ActionCardWrapper>
        <ScheduleCarouselWrapper>
          <ScheduleHeader>
            <ScheduleTitle>정기전 일정</ScheduleTitle>
          </ScheduleHeader>
          <FreeModeCarousel padding="0px 20px" spaceBetween={0}>
            {Object.entries(SCHEDULE_INFO).map(([date, events], index) => (
              <React.Fragment key={`${date}-${index}`}>
                <Date>{date}</Date>
                <Flex $align="flex-start">
                  {events.map((event, index) => (
                    <ScheduleCard
                      key={event.title + index}
                      title={event.title}
                      time={event.time}
                      location={event.location}
                      backgroundImage={event.img}
                    />
                  ))}
                </Flex>
              </React.Fragment>
            ))}
          </FreeModeCarousel>
        </ScheduleCarouselWrapper>
        {/* TODO 불렛 처리 */}
        <AdWrapper>
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            modules={[Pagination, Autoplay]}
            spaceBetween={10}
            loop
            slidesPerView={1}
          >
            {AD_BANNER_LIST.map((banner, index) => (
              <SwiperSlide
                key={`${banner.imgUrl}-${index}`}
                onClick={() => {
                  window.open(banner.link, '_blank');
                }}
              >
                <BannerImage src={banner.imgUrl} alt="ad" fill sizes="100vw 100%" />
              </SwiperSlide>
            ))}
          </Swiper>
        </AdWrapper>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${({ theme }) => theme.space.mainTopBarHeight}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

const Date = styled.div`
  width: 87px;
  height: 29px;
  padding: 4px 16px;
  justify-content: center;
  align-items: flex-end;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.28px;
  margin-bottom: 8px;
`;

const ActionCardWrapper = styled.div`
  padding: 0px 20px;
`;

const ScheduleCarouselWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  gap: 12px;
`;

const ScheduleHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 14px 0px 20px;
`;

const ScheduleTitle = styled.div`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const AdWrapper = styled.div`
  padding: 0px 20px;
  margin-bottom: 32px;
  margin-top: 32px;
  width: 100%;
  position: relative;
  aspect-ratio: 350/78;
  .swiper {
    height: 100%;
  }
`;

const BannerImage = styled(Image)`
  object-fit: fill;
`;
