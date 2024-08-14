import 'swiper/css';
import styled from 'styled-components';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { forwardRef } from 'react';

export const SignupContents = forwardRef<SwiperRef>(function SignupContents(props, ref) {
  return (
    <SwiperWrapper slidesPerView={1} allowTouchMove={false} ref={ref}>
      <SwiperSlide>
        <Contents>1페이지</Contents>
      </SwiperSlide>
      <SwiperSlide>
        <Contents>2페이지</Contents>
      </SwiperSlide>
      <SwiperSlide>
        <Contents>3페이지</Contents>
      </SwiperSlide>
      <SwiperSlide>
        <Contents>4페이지</Contents>
      </SwiperSlide>
    </SwiperWrapper>
  );
});

const SwiperWrapper = styled(Swiper)`
  padding-top: ${({ theme }) => theme.space.signupTopBarHeight + theme.space.signupStatusBarHeight}px;
`;

const Contents = styled.section`
  padding: 43px 24px;
  color: white;
`;
