'use client';

import styled from 'styled-components';
import Image from 'next/image';

import { useProfileStore } from '@/libs/store/useProfileStore';
import TODO_DUMMY_IMAGE from '@/public/banner1.png';
import UserInfoTopBar from '@/components/UserInfoTopBar';
import InputBox from '@/components/InputBox';
import { useCallback, useEffect, useState } from 'react';
import { usePatchProfile } from '@/libs/apis/users';
import { getCheckName } from '@/libs/apis/auth';

export default function UserInfo() {
  const { mutate: patchProfile } = usePatchProfile();

  const prevNickname = useProfileStore((state) => state.profile?.name);
  const prevPhoneNumber = useProfileStore((state) => state.profile?.phoneNumber);
  const school = useProfileStore((state) => state.profile?.university);

  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const [isAvailableNickname, setIsAvailableNickname] = useState(true);
  const canEdit =
    isAvailableNickname &&
    (nickname !== prevNickname ||
      (phoneNumber !== prevPhoneNumber &&
        phoneNumber.length === 11 &&
        /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/.test(phoneNumber)));

  const handleNickname = useCallback((input: string) => {
    setNickname(input);
    setIsAvailableNickname(false);
  }, []);

  const handlePhoneNumber = useCallback((input: string) => {
    const reg = /\D/g;
    input = input.replace(reg, '');
    setPhoneNumber(input);
  }, []);

  const handleNicknameValidation = useCallback(() => {
    if (nickname === prevNickname) {
      setError('기존 닉네임과 동일합니다.');
    } else {
      getCheckName({ name: nickname }).then((validation) => {
        if (validation) {
          setIsAvailableNickname(true);
        } else {
          setError('이미 존재하는 닉네임입니다.');
        }
      });
    }
  }, [nickname, prevNickname]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleEditButton = useCallback(() => {
    if (canEdit) {
      patchProfile({ name: nickname, phoneNumber });
    }
  }, [canEdit, nickname, phoneNumber, patchProfile]);

  useEffect(() => {
    // 새로고침 등으로 프로필 데이터 패칭이 늦어질 경우
    if (prevNickname !== undefined && prevPhoneNumber !== undefined) {
      setNickname(prevNickname);
      setPhoneNumber(prevPhoneNumber);
    }
  }, [prevNickname, prevPhoneNumber]);

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
                setValue={handleNickname}
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
            {school === 1 ? '연세대학교' : '고려대학교'}
          </FixedValue>
        </FormList>
      </Wrapper>
      <EditButton $available={canEdit} onClick={handleEditButton}>
        수정하기
      </EditButton>
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

const EditButton = styled.button<{ $available: boolean }>`
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
  color: ${({ $available }) =>
    $available
      ? 'var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87))'
      : 'var(--white-15, rgba(255, 255, 255, 0.15))'};

  transition: all 0.2s;
`;
