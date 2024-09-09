import { UnivButton } from '@/components/Signup/SetUniv/UnivButton';
import styled from 'styled-components';

export function SetUniv() {
  return (
    <Wrapper>
      <label>
        응원하는 <strong>학교</strong>를 선택해주세요.
      </label>
      <ButtonWrapper>
        <UnivButton school="korea" />
        <UnivButton school="yonsei" />
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  font-size: 22px;
  letter-spacing: -0.88px;
  color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
  & strong {
    color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 22px;
  align-items: center;
  justify-content: center;
`;
