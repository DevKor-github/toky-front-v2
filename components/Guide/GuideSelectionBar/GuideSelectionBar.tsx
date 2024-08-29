import styled, { css } from 'styled-components';
interface GuideSelectionBarProps {
  type: 'period' | 'service';
  setType: (type: 'period' | 'service') => void;
}
export function GuideSelectionBar({ type, setType }: GuideSelectionBarProps) {
  return (
    <Wrapper>
      <Tap $isSelected={type === 'period'} onClick={() => setType('period')}>
        운영 기간
      </Tap>
      <Tap $isSelected={type === 'service'} onClick={() => setType('service')}>
        운영 서비스
      </Tap>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  top: ${(props) => props.theme.space.mainTopBarHeight}px;
  display: flex;
  z-index: ${({ theme }) => theme.zIndex.SportsSelectionBar};
  position: sticky;
  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );
  height: 59px;
`;
const Tap = styled.button<{ $isSelected: boolean }>`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.72px;
  color: ${({ theme, $isSelected }) => ($isSelected ? theme.colors.white87 : 'rgba(255, 255, 255, 0.38)')};
  ${({ theme, $isSelected }) =>
    $isSelected &&
    css`
      &::after {
        content: '';
        width: 61px;
        height: 2px;
        background: #ffffff;
        position: absolute;
        bottom: 0;
      }
    `}
`;
