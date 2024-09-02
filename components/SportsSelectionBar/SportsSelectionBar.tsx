'use client';

import { memo } from 'react';
import styled from 'styled-components';

import { SelectionArray, SelectionType } from '@/libs/constants/sports';
import { SportsButton } from '@/components/SportsSelectionBar/SportsButton';

const PlayArray = SelectionArray.slice(0, 4);

interface SportsSelectionBarProps {
  curSelection: SelectionType;
  handleSelect: (selection: SelectionType) => void;
  bgColor?: string; // 커스텀 배경색
  showAll?: boolean; // "전체" 항목의 표시 여부
  hasUnderbar?: boolean; // 선택된 nav 항목 아래에 밑줄 표시 여부
  isSticky?: boolean; // position : sticky 여부
  isPlayOnly?: boolean; // 럭비 제외 여부
}
export const SportsSelectionBar = memo(function SportsSelectionBar({
  curSelection,
  handleSelect,
  bgColor,
  showAll = false,
  hasUnderbar = true,
  isSticky = false,
  isPlayOnly = false,
}: SportsSelectionBarProps) {
  const SportsArray = isPlayOnly ? PlayArray : SelectionArray;
  return (
    <Wrapper $bgColor={bgColor} $isSticky={isSticky} $isPlayOnly={isPlayOnly}>
      {showAll && (
        <SportsButton isSelected={curSelection === 'all'} onClick={() => handleSelect('all')} hasUnderbar={hasUnderbar}>
          전체
        </SportsButton>
      )}
      {SportsArray.map((sport) => (
        <SportsButton
          key={sport.title}
          isSelected={curSelection === sport.type}
          onClick={() => handleSelect(sport.type)}
          hasUnderbar={hasUnderbar}
        >
          {sport.title}
        </SportsButton>
      ))}
    </Wrapper>
  );
});

const Wrapper = styled.nav<{ $bgColor?: string; $isSticky: boolean; $isPlayOnly: boolean }>`
  top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
  display: flex;
  justify-content: space-between;
  z-index: ${({ theme }) => theme.zIndex.SportsSelectionBar};
  padding: 0 ${({ $isPlayOnly }) => ($isPlayOnly ? 40 : 20)}px;
  ${({ $isSticky }) => $isSticky && 'position: sticky;'}
  background: ${({ $bgColor }) =>
    $bgColor ||
    'linear-gradient(90deg, rgba(76, 14, 176, 0.40) -12.75%, rgba(76, 14, 176, 0.24) 113.73%), linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #121212'};
`;
