import styled from 'styled-components';
import { useSignupError, useSignupForm } from '@/app/signup/store';

import { InputBox } from '@/components/Signup/SignupContents/InputBox';

export function SetNickname() {
  const nickname = useSignupForm((state) => state.nickname);
  const setNickname = useSignupForm((state) => state.setNickname);
  const error = useSignupError((state) => state.error);

  return (
    <Wrapper>
      <Guide>
        <p>나중에 수정 가능해요!</p>
        <h2>
          <strong>닉네임</strong>을 입력해주세요.
        </h2>
      </Guide>
      <FormWrapper>
        <InputBox placeholder="닉네임" value={nickname} setValue={setNickname} type="nickname" maxLength={10} />
        <InputStatus>
          <NicknameCount>{nickname.length}/10</NicknameCount>
          {error === 'nickname' && <ErrorMessage>이미 존재하는 닉네임 입니다.</ErrorMessage>}
        </InputStatus>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;
const Guide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  color: var(--_60, rgba(255, 255, 255, 0.6));

  & p {
    font-size: 12px;
    font-weight: 300;
    letter-spacing: -0.48px;
  }
  & h2 {
    font-size: 22px;
    letter-spacing: -0.88px;
    & strong {
      color: var(--white_0, #fff);
    }
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputStatus = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
