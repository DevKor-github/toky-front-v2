import React from 'react';
import { motion } from 'framer-motion';
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
      {hasUnderbar && isSelected && <UnderBar layoutId="underbar" transition={{ duration: 0.15 }} />}
    </Wrapper>
  );
}

const Wrapper = styled.button<{ $selected: boolean }>`
  position: relative;
  height: 44px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  transition: all 0.15s;
  color: ${({ $selected }) => {
    return $selected ? '#ffffffde' : '#ffffff61';
  }};
`;

const UnderBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background: #ffffffde;
  border-top-right-radius: 99px;
  border-top-left-radius: 99px;
`;
