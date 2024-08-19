import 'swiper/css';
import styled from 'styled-components';
import { forwardRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import SetUniv from '@/components/Signup/SetUniv';
import SetNickname from '@/components/Signup/SetNickname';
import SetPhoneNumber from '@/components/Signup/SetPhoneNumber';
import TermsAgreement from '@/components/Signup/TermsAgreement';
import { Welcome } from '@/components/Signup/Welcome/Welcome';

interface SignupFunnelProps {}
export const SignupFunnel = forwardRef<SwiperRef, SignupFunnelProps>(function SignupContents({}, ref) {
  return (
    <SwiperWrapper slidesPerView={1} allowTouchMove={false} ref={ref}>
      <SwiperSlide>
        <Contents>
          <SetUniv />
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
      <SwiperSlide>
        <Contents>
          <TermsAgreement />
        </Contents>
      </SwiperSlide>
      <SwiperSlide>
        <Contents>
          <Welcome />
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
