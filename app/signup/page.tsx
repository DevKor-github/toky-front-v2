'use client';

import styled from 'styled-components';
import { SwiperRef } from 'swiper/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import SignupTopBar from '@/components/Signup/SignupTopBar';
import SignupProgress from '@/components/Signup/SignupProgress';
import SignupContents from '@/components/Signup/SignupContents';

export default function SignUp() {
  const router = useRouter();

  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    // 스와이퍼와 progress 동기화
    swiperRef.current?.swiper.slideTo(progress);
  }, [progress]);

  const handlePrevButton = useCallback(() => {
    if (progress === 0) {
      router.back();
    } else {
      setProgress((prev) => prev - 1);
    }
  }, [router, progress]);

  return (
    <div>
      <SignupTopBar handlePrevButton={handlePrevButton} />
      <SignupProgress curProgress={progress} totalProgress={3} />
      <SignupContents ref={swiperRef} />
      <SignupFooter
        isDone={false}
        onClick={() => {
          if (progress !== 3) {
            // TODO: Validation Check
            setProgress((prev) => prev + 1);
          } else {
            // TODO: Sign-up Form Submit
            console.log('Sign Up');
          }
        }}
      >
        {'다음'}
      </SignupFooter>
    </div>
  );
}

const SignupFooter = styled.button<{ isDone: boolean }>`
  position: fixed;
  bottom: 0;

  width: 100%;
  height: 64px;
  padding: 20px 0;
  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.8px;
  color: ${({ isDone }) =>
    isDone ? 'var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87))' : 'var(--white-15, rgba(255, 255, 255, 0.15))'};
`;
