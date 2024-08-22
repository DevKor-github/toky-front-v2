'use client';

import styled from 'styled-components';
import Image from 'next/image';

import TODO_DUMMY_IMAGE from '@/public/banner1.png';
import UserInfoTopBar from '@/components/UserInfoTopBar';
import InputBox from '@/components/InputBox';
import { useCallback, useState } from 'react';

export default function UserInfo() {
  const [nickname, setNickname] = useState<string>('halion'); // TODO: API로 user name으로 초기값 설정
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('01012345678'); // TODO: API로 user number로 초기값 설정

  const handlePhoneNumber = useCallback((input: string) => {
    const reg = /\D/g;
    input = input.replace(reg, '');
    setPhoneNumber(input);
  }, []);

  const handleNicknameValidation = useCallback(() => {
    // input Validation Check
    if (nickname === 'halion') {
      setError('기존 닉네임과 동일합니다.');
    } else if (nickname === 'error') {
      setError('이미 존재하는 닉네임입니다.');
    }
    return true;
  }, [nickname]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <div>
      <UserInfoTopBar />
      <Wrapper>
        <UserProfileImage>
          <Image alt="user profile" src={TODO_DUMMY_IMAGE} width={70} height={70} />
        </UserProfileImage>
        <FormList>
          <FormWrapper>
            <h2>닉네임</h2>
            <InputWrapper>
              <InputBox
                type="edit"
                placeholder="닉네임"
                value={nickname}
                setValue={setNickname}
                maxLength={10}
                validationButton={{ text: '중복확인', onClick: handleNicknameValidation }}
                error={error !== null}
                clearError={clearError}
              />
              <InputStatus>
                <NicknameCount>{nickname.length}/10</NicknameCount>
                {error && <ErrorMessage>{error}</ErrorMessage>}
              </InputStatus>
            </InputWrapper>
          </FormWrapper>
          <FormWrapper>
            <h2>전화번호</h2>
            <InputBox
              type="edit"
              placeholder="전화번호"
              value={phoneNumber}
              setValue={handlePhoneNumber}
              maxLength={11}
            />
          </FormWrapper>
          <FixedValue>
            <h2>학교</h2>
            {/* TODO: API로 User 학교 패칭  */}
            {'고려대학교'}
          </FixedValue>
          <FixedValue>
            <h2>간편 로그인 연결</h2>
            카카오톡
          </FixedValue>
        </FormList>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding: 0 20px;
  padding-top: ${({ theme }) => theme.space.navigationBarHeight}px;

  display: flex;
  flex-direction: column;
`;

const UserProfileImage = styled.div`
  padding-top: 32px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    border-radius: 100%;
    object-fit: cover;
  }
`;

const FormList = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  & h2 {
    padding-left: 8px;
    color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.6px;
  }

  margin-bottom: 30px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const InputStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 6px;
`;

const NicknameCount = styled.span`
  color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
  font-size: 14px;
`;

const ErrorMessage = styled.span`
  color: #f95b6e;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.48px;
`;

const FixedValue = styled.div`
  margin-bottom: 46px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 17px;
  font-weight: 400;
  letter-spacing: -1.02px;
  padding-left: 8px;
  & h2 {
    color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.6px;
  }
`;
