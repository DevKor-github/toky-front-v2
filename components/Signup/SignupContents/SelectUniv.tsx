import styled from 'styled-components';

import { SchoolType } from '@/app/signup/constants';
import { useSignupForm } from '@/app/signup/store';

export const SelectUniv = function SelectUniv() {
  const selectedSchool = useSignupForm((state) => state.school);
  const setSchool = useSignupForm((state) => state.setSchool);

  return (
    <Wrapper>
      <label>
        <strong>학교</strong>를 선택해주세요.
      </label>
      <ButtonWrapper>
        <Button $status={selectedSchool === 'korea' ? 'korea' : null} onClick={() => setSchool('korea')}>
          고려대학교
        </Button>
        <Button $status={selectedSchool === 'yonsei' ? 'yonsei' : null} onClick={() => setSchool('yonsei')}>
          연세대학교
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

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
const Button = styled.button<{ $status: SchoolType }>`
  width: 128px;
  height: 128px;
  border-radius: 100%;
  background: ${({ $status }) => {
    switch ($status) {
      case null:
        return `var(--Background-5, linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #121212)`;
      case 'korea':
        return `var(--grad_red, linear-gradient(90deg, #F3233C 0%, #F95B6E 100%))`;
      case 'yonsei':
        return `var(--grad_blue, linear-gradient(90deg, #5B84FF 0%, #2948FF 100%))`;
    }
  }};

  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 18px;
  letter-spacing: -0.72px;
  font-weight: ${({ $status }) => ($status === null ? 500 : 700)};
`;
