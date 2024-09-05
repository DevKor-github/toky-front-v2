import styled from 'styled-components';
import { useSignupError, useSignupForm } from '@/app/signup/store';

import InputBox from '@/components/InputBox';

export function SetPhoneNumber() {
  const phoneNumber = useSignupForm((state) => state.phoneNumber);
  const setPhoneNumber = useSignupForm((state) => state.setPhoneNumber);
  const { error, clearError } = useSignupError();

  const setValue = (input: string) => {
    const reg = /\D/g;
    input = input.replace(reg, '');
    setPhoneNumber(input);
  };

  return (
    <Wrapper>
      <Guide>
        <p>경품 지급을 위해 필요한 정보에요!</p>
        <h2>
          <strong>전화번호</strong>를 입력해주세요.
        </h2>
      </Guide>
      <FormWrapper>
        <InputBox
          placeholder="전화번호"
          inputType="number"
          value={phoneNumber}
          setValue={setValue}
          error={error === 'phoneNumber'}
          maxLength={11}
          clearError={clearError}
        />
        {error === 'phoneNumber' && <ErrorMessage>이미 사용 중인 전화번호입니다.</ErrorMessage>}
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

const ErrorMessage = styled.span`
  color: #f95b6e;
  font-size: 12px;
  font-weight: 300;
  letter-spacing: -0.48px;
  text-align: right;
`;
