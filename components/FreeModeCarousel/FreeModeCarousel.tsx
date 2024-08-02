import React from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

export function FreeModeCarousel({
  children,
  padding,
  spaceBetween,
}: {
  children: React.ReactNode;
  padding?: string;
  spaceBetween?: number;
}) {
  return (
    <Wrapper padding={padding}>
      <Swiper slidesPerView={'auto'} spaceBetween={spaceBetween ?? 20} freeMode={true} modules={[FreeMode]}>
        {React.Children.map(children, (child) => (
          <SwiperSlide style={{ width: 'auto' }}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ padding?: string }>`
  padding: ${(props) => props.padding || '0'};
`;
