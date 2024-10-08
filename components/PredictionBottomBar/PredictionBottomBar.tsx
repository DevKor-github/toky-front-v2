import styled from 'styled-components';

import { Icon } from '@/libs/design-system/icons';
import { PlaySportsArray, SelectionMap, SelectionType } from '@/libs/constants/sports';

interface PredictionBottomBarProps {
  curSelection: Exclude<SelectionType, 'all'>;
  handleNav: (selection: Exclude<SelectionType, 'all'>) => void;
}

export function PredictionBottomBar({ curSelection, handleNav }: PredictionBottomBarProps) {
  const endIndex = PlaySportsArray.length - 1;
  return (
    <BottomBar>
      <NavButton
        onClick={() => {
          handleNav(PlaySportsArray[SelectionMap[curSelection] - 1].type);
        }}
      >
        {curSelection !== PlaySportsArray[0].type && (
          <>
            <Icon.ArrowRight color="#FFFFFFDE" rotate={180} />
            <span>{PlaySportsArray[SelectionMap[curSelection] - 1].title}</span>
          </>
        )}
      </NavButton>
      <NavButton
        onClick={() => {
          handleNav(PlaySportsArray[SelectionMap[curSelection] + 1].type);
        }}
      >
        {curSelection !== PlaySportsArray[endIndex].type && (
          <>
            <span>{PlaySportsArray[SelectionMap[curSelection] + 1].title}</span>
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

const NavButton = styled.button`
  display: flex;
  gap: 8px;
  cursor: pointer;
  align-items: center;

  & span {
    color: #ffffffde;
    font-size: 15px;
    font-weight: 700;
    letter-spacing: -0.6px;
  }
`;
