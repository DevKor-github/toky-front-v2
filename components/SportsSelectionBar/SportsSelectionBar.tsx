'use client';

import styled from 'styled-components';

import { SelectionArray, SelectionType } from '@/components/SportsSelectionBar/constants';
import { memo } from 'react';
import { SportsButton } from '@/components/SportsSelectionBar/SportsButton';

interface SportsSelectionBarProps {
  curSelection: SelectionType;
  handleSelect: (selection: SelectionType) => void;
  bgColor?: string; // 커스텀 배경색
  isAllNav?: boolean; // "전체" 항목의 표시 여부
  hasUnderbar?: boolean; // 선택된 nav 항목 아래에 밑줄 표시 여부
  isSticky?: boolean; // position : sticky 여부
}
export const SportsSelectionBar = memo(function SportsSelectionBar({
  curSelection,
  handleSelect,
  bgColor,
  isAllNav = false,
  hasUnderbar = true,
  isSticky = false,
}: SportsSelectionBarProps) {
  return (
    <Wrapper $bgColor={bgColor} isSticky={isSticky}>
      {isAllNav && (
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

const Wrapper = styled.div<{ $bgColor?: string; isSticky: boolean }>`
  top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  ${({ isSticky }) => isSticky && 'position: sticky;'}
  background: ${({ $bgColor }) =>
    $bgColor ||
    'linear-gradient(0deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05)),linear-gradient(90deg, rgba(76, 14, 176, 0.4) -12.75%, rgba(76, 14, 176, 0.24) 113.73%);'};
`;
