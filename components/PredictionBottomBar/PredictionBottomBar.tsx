import styled from 'styled-components';

import { Icon } from '@/libs/design-system/icons';
import { SelectionArray, SelectionMap, SelectionType } from '@/libs/constants/sports';

interface PredictionBottomBarProps {
  curSelection: Exclude<SelectionType, 'All'>;
  handleNav: (selection: Exclude<SelectionType, 'All'>) => void;
}

export function PredictionBottomBar({ curSelection, handleNav }: PredictionBottomBarProps) {
  const endIndex = SelectionArray.length - 1;
  return (
    <BottomBar>
      <NavButton
        type="prev"
        onClick={() => {
          handleNav(SelectionArray[SelectionMap[curSelection] - 1].type);
        }}
      >
        {curSelection !== SelectionArray[0].type && (
          <>
            <Icon.ArrowRight color="#FFFFFF61" rotate={180} />
            <span>{SelectionArray[SelectionMap[curSelection] - 1].title}</span>
          </>
        )}
      </NavButton>
      <NavButton
        type="next"
        onClick={() => {
          handleNav(SelectionArray[SelectionMap[curSelection] + 1].type);
        }}
      >
        {curSelection !== SelectionArray[endIndex].type && (
          <>
            <span>{SelectionArray[SelectionMap[curSelection] + 1].title}</span>
            <Icon.ArrowRight color="#FFFFFFDE" rotate={0} />
          </>
        )}
      </NavButton>
    </BottomBar>
  );
}

const BottomBar = styled.div`
  padding: 20px;
  padding-bottom: 36px;
  display: flex;
  justify-content: space-between;
  background: var(
    --Background-3,
    linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%),
    #121212
  );
`;

const NavButton = styled.button<{ type: 'prev' | 'next' }>`
  display: flex;
  gap: 8px;
  cursor: pointer;
  align-items: center;

  & span {
    color: ${({ type }) => (type === 'prev' ? '#FFFFFF61' : '#FFFFFFDE')};
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.6px;
  }
`;
