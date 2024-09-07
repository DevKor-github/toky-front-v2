import 'swiper/css';
import styled from 'styled-components';
import { forwardRef } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import SetUniv from '@/components/Signup/SetUniv';
import SetNickname from '@/components/Signup/SetNickname';
import SetPhoneNumber from '@/components/Signup/SetPhoneNumber';
import TermsAgreement from '@/components/Signup/TermsAgreement';
import Welcome from '@/components/Signup/Welcome';

interface SignupFunnelProps {
  curProgress: number;
  preventSwiperTab: () => void;
  nickname: string;
}
export const SignupFunnel = forwardRef<SwiperRef, SignupFunnelProps>(function SignupContents(
  { curProgress, preventSwiperTab, nickname },
  ref,
) {
  return (
    <SwiperWrapper slidesPerView={1} allowTouchMove={false} ref={ref} curProgress={curProgress}>
      <SwiperSlide onFocus={preventSwiperTab}>
        <Contents>
          <SetUniv />
        </Contents>
      </SwiperSlide>
      <SwiperSlide onFocus={preventSwiperTab}>
        <Contents>
          <SetNickname />
        </Contents>
      </SwiperSlide>
      <SwiperSlide onFocus={preventSwiperTab}>
        <Contents>
          <SetPhoneNumber />
        </Contents>
      </SwiperSlide>
      <SwiperSlide onFocus={preventSwiperTab}>
        <Contents>
          <TermsAgreement curProgress={curProgress} />
        </Contents>
      </SwiperSlide>
      <SwiperSlide onFocus={preventSwiperTab}>
        <Contents hasPadding={false}>
          <Welcome curProgress={curProgress} nickname={nickname} />
        </Contents>
      </SwiperSlide>
    </SwiperWrapper>
  );
});

const SwiperWrapper = styled(Swiper)<{ curProgress: number }>`
  padding-top: ${({ theme, curProgress }) =>
    curProgress === 4 ? 0 : theme.space.signupTopBarHeight + theme.space.signupStatusBarHeight}px;

  font-family: 'Spoqa Han Sans Neo';
`;

const Contents = styled.section<{ hasPadding?: boolean }>`
  padding: ${({ hasPadding = true }) => (hasPadding ? `43px 24px` : 0)};
  color: white;
`;
