import React from 'react';
import styled from 'styled-components';

interface SportsButtonProps {
  isSelected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  hasUnderbar: boolean;
}
export function SportsButton({ isSelected, onClick, children, hasUnderbar }: SportsButtonProps) {
  return (
    <Wrapper $selected={isSelected} onClick={onClick}>
      {children}
      <UnderBar $show={hasUnderbar && isSelected} />
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $selected: boolean }>`
  display: flex;
  padding-top: 12px;
  flex-direction: column;
  gap: 10px;
  font-size: 16px;
  color: ${({ $selected }) => {
    return $selected ? '#FFFFFFDE' : '#ffffff61';
  }};
`;

const UnderBar = styled.div<{ $show: boolean }>`
  height: 2px;
  width: 100%;
  background: #ffffffde;
  border-top-right-radius: 99px;
  border-top-left-radius: 99px;
  ${({ $show }) => !$show && 'visibility: hidden;'}
`;
