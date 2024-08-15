import 'swiper/css';
import styled from 'styled-components';
import { forwardRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { SelectUniv } from '@/components/Signup/SignupContents/SelectUniv';
import { SetNickname } from '@/components/Signup/SignupContents/SetNickname';
import { SetPhoneNumber } from '@/components/Signup/SignupContents/SetPhoneNumber';

interface SignupContentsProps {}
export const SignupContents = forwardRef<SwiperRef, SignupContentsProps>(function SignupContents({}, ref) {
  return (
    <SwiperWrapper slidesPerView={1} allowTouchMove={false} ref={ref}>
      <SwiperSlide>
        <Contents>
          <SelectUniv />
        </Contents>
      </SwiperSlide>
      <SwiperSlide>
        <Contents>
          <SetNickname />
        </Contents>
      </SwiperSlide>
      <SwiperSlide>
        <Contents>
          <SetPhoneNumber />
        </Contents>
      </SwiperSlide>
    </SwiperWrapper>
  );
});

const SwiperWrapper = styled(Swiper)`
  padding-top: ${({ theme }) => theme.space.signupTopBarHeight + theme.space.signupStatusBarHeight}px;

  font-family: 'Spoqa Han Sans Neo';
`;

const Contents = styled.section`
  padding: 43px 24px;
  color: white;
`;
