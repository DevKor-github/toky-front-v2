'use client';

import { memo } from 'react';
import styled from 'styled-components';

import { SelectionArray, SelectionType } from '@/libs/constants/sports';
import { SportsButton } from '@/components/SportsSelectionBar/SportsButton';

interface SportsSelectionBarProps {
  curSelection: SelectionType;
  handleSelect: (selection: SelectionType) => void;
  bgColor?: string; // 커스텀 배경색
  showAll?: boolean; // "전체" 항목의 표시 여부
  hasUnderbar?: boolean; // 선택된 nav 항목 아래에 밑줄 표시 여부
  isSticky?: boolean; // position : sticky 여부
}
export const SportsSelectionBar = memo(function SportsSelectionBar({
  curSelection,
  handleSelect,
  bgColor,
  showAll = false,
  hasUnderbar = true,
  isSticky = false,
}: SportsSelectionBarProps) {
  return (
    <Wrapper $bgColor={bgColor} $isSticky={isSticky}>
      {showAll && (
        <SportsButton isSelected={curSelection === 'All'} onClick={() => handleSelect('All')} hasUnderbar={hasUnderbar}>
          전체
        </SportsButton>
      )}
      {SelectionArray.map((sport) => (
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

const Wrapper = styled.nav<{ $bgColor?: string; $isSticky: boolean }>`
  top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
  display: flex;
  justify-content: space-between;
  z-index: ${({ theme }) => theme.zIndex.SportsSelectionBar};
  padding: 0 20px;
  ${({ $isSticky }) => $isSticky && 'position: sticky;'}
  background: ${({ $bgColor }) =>
    $bgColor ||
    'linear-gradient(90deg, rgba(76, 14, 176, 0.40) -12.75%, rgba(76, 14, 176, 0.24) 113.73%), linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #121212'};
`;
