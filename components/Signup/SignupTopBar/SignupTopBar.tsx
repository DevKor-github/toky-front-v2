import styled from 'styled-components';

import { ArrowLeft } from '@/libs/design-system/icons/ArrowLeft';

interface SignupTopBarProps {
  handlePrevButton: () => void;
}
export function SignupTopBar({ handlePrevButton }: SignupTopBarProps) {
  return (
    <Wrapper>
      <FlexItems>
        <button onClick={handlePrevButton}>
          <ArrowLeft />
        </button>
      </FlexItems>
      <CenterItems style={{ textAlign: 'center' }}>회원가입</CenterItems>
      <FlexItems />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: ${({ theme }) => theme.space.signupTopBarHeight}px;
  background-color: ${({ theme }) => theme.colors.topBar};
  padding: 13px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  color: white;
  z-index: ${({ theme }) => theme.zIndex.MainTopBar};
`;

const FlexItems = styled.div`
  flex-grow: 1;
  flex-basis: 0;
  font-weight: 400;
  font-size: 18;
  font-family: 'Spoqa Han Sans Neo';
  letter-spacing: -0.72px;
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
`;

const CenterItems = styled(FlexItems)`
  text-align: center;
`;
