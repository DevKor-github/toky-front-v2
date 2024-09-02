'use client';

import styled from 'styled-components';
import { SwiperRef } from 'swiper/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSignupError, useSignupForm } from '@/app/signup/store';

import { TOTAL_PROGRESS } from '@/app/signup/constants';
import SignupTopBar from '@/components/Signup/SignupTopBar';
import SignupProgress from '@/components/Signup/SignupProgress';
import SignupFunnel from '@/components/Signup/SignupFunnel';
import { getCheckName, useGetNeedSignup, usePostSignup } from '@/libs/apis/auth';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';

export default function SignUp() {
  const router = useRouter();

  const { data: isAlreadySignup, isSuccess, isError, refetch: checkAlreadySignUp } = useGetNeedSignup();
  const { mutate: singup } = usePostSignup();
  const login = useAuthStore((state) => state.login);

  const formState = useSignupForm();
  const errorState = useSignupError();
  const [clickable, setClickable] = useState(false);

  const totalProgress = TOTAL_PROGRESS;
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    // 스와이퍼와 progress 동기화
    swiperRef.current?.swiper.slideTo(progress);
  }, [progress]);

  useEffect(() => {
    if ((isSuccess && isAlreadySignup) || isError) {
      router.push('/');
    }
  }, [isSuccess, router, isAlreadySignup, isError]);

  const handlePrevButton = useCallback(() => {
    if (progress === 0) {
      router.back();
    } else {
      setProgress((prev) => prev - 1);
    }
  }, [router, progress]);

  const preventSwiperTab = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.el.scrollLeft = 0;
    }
  };

  // 다음 버튼 활성화 로직
  useEffect(() => {
    switch (progress) {
      case 0:
        setClickable(formState.school !== null);
        break;
      case 1:
        setClickable(formState.nickname !== '');
        break;
      case 2:
        setClickable(
          formState.phoneNumber.length === 11 &&
            /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/.test(formState.phoneNumber),
        );
        break;
      case 3:
        setClickable(formState.agreement);
        break;
    }
  }, [progress, formState]);

  const handleNextButton = () => {
    if (clickable) {
      switch (progress) {
        case 0:
          setProgress((prev) => prev + 1);
          break;
        case 1:
          getCheckName({ name: formState.nickname }).then((val) => {
            if (val) {
              setProgress((prev) => prev + 1);
            } else {
              errorState.setError('nickname');
            }
          });
          break;
        case 2:
          setProgress((prev) => prev + 1);
          break;
        case 3:
          const inviteCode = sessionStorage.getItem('invite-code');
          sessionStorage.removeItem('invite-code');
          singup(
            {
              name: formState.nickname,
              phoneNumber: formState.phoneNumber,
              university: formState.school === 'korea' ? 0 : 1,
              inviteCode: inviteCode ?? undefined,
            },
            {
              onSuccess: () => {
                setProgress((prev) => prev + 1);
                login();
              },
            },
          );
          break;
        case 4:
          // 토키 시작하기
          router.push('/');
          break;
      }
    }
  };

  useEffect(() => {
    checkAlreadySignUp();
  }, [checkAlreadySignUp]);

  return (
    <div>
      <SignupTopBar handlePrevButton={handlePrevButton} />
      <SignupProgress curProgress={progress} totalProgress={totalProgress} />
      <SignupFunnel ref={swiperRef} preventSwiperTab={preventSwiperTab} />
      <SignupFooter $isDone={clickable} onClick={handleNextButton}>
        {progress === totalProgress ? '토키 시작하기' : '다음'}
      </SignupFooter>
    </div>
  );
}

const SignupFooter = styled.button<{ $isDone: boolean }>`
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
  color: ${({ $isDone }) =>
    $isDone
      ? 'var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87))'
      : 'var(--white-15, rgba(255, 255, 255, 0.15))'};

  transition: all 0.2s;
`;
