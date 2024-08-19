import styled from 'styled-components';

import { Check } from '@/libs/design-system/icons/Check';

interface TermButtonProps {
  selected: boolean;
  onClick: () => void;
  text: string;
}
export function TermButton({ selected, onClick, text }: TermButtonProps) {
  return (
    <ButtonWrapper $selected={selected} onClick={onClick}>
      <Check opacity={selected ? 0.87 : 0.38} />
      {text}
    </ButtonWrapper>
  );
}

const ButtonWrapper = styled.button<{ $selected: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;

  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 14px;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.56px;
`;
