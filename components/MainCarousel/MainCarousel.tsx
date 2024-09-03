import { Icon } from '@/libs/design-system/icons';
import styled from 'styled-components';
import { css } from 'styled-components';
import Link from 'next/link';
import banner1 from '@/public/banner1.png';
import MainCarouselContent from './MainCarouselContent';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export function MainCarousel() {
  const bannersList = [banner1, banner1, banner1]; // TODO: 서버에서 이미지 파일 가져와서 생성
  return (
    <Wrapper className="MainCarouselWrapper">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        loop
        slidesPerView={1}
        pagination={{
          type: 'fraction',
          renderFraction: function (currentClass, totalClass) {
            return `<span class="${currentClass}"></span> <span class="swiper-pagination-slash">/</span> <span class="${totalClass}"></span>`;
          },
        }}
      >
        {bannersList.map((banner, index) => (
          <SwiperSlide key={`${banner.src}-${index}`}>
            <MainCarouselContent src={banner.src} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}

const PaginationContainer = css`
  width: 37px;
  height: 21px;
  position: absolute;
  left: unset !important;
  right: 20px;
  bottom: 12px;
  display: flex;
  padding: 3px 8px;
  justify-content: center;
  align-items: center;
  border-radius: 99px;
  background: rgba(0, 0, 0, 0.3);

  .swiper-pagination-current {
    color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.72px;
  }

  .swiper-pagination-slash {
    color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.72px;
  }

  .swiper-pagination-total {
    color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
    font-family: 'Spoqa Han Sans Neo';
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.72px;
  }
`;
// TODO: 테마 색상 적용

const Wrapper = styled.div`
  .swiper-pagination {
    ${PaginationContainer}
  }
`;
