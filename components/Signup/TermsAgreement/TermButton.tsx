import styled from 'styled-components';
import { useState } from 'react';

import { Check } from '@/libs/design-system/icons/Check';

interface TermButtonProps {
  selected: boolean;
  onClick: () => void;
  text: string;
  details: string;
}
export function TermButton({ selected, onClick, text, details }: TermButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper $isOpen={isOpen}>
      <ButtonWrapper $selected={selected} onClick={onClick}>
        <CheckWrapper>
          <Check opacity={selected ? 0.87 : 0.38} />
          <CheckGradient $selected={selected} />
        </CheckWrapper>
        <ContentsWrapper>
          {text}
          <FoldHandler
            onClick={(event) => {
              event.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            {isOpen ? '접기' : '펼치기'}
          </FoldHandler>
        </ContentsWrapper>
      </ButtonWrapper>
      {isOpen && <Details>{details}</Details>}
    </Wrapper>
  );
}

const Wrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
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

const CheckWrapper = styled.div`
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const CheckGradient = styled.div<{ $selected: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;

  background: var(--Purple-Gradient, linear-gradient(90deg, #4c0eb0 -12.75%, rgba(76, 14, 176, 0.6) 113.73%));
  opacity: ${({ $selected }) => ($selected ? 1 : 0)};
  transition: opacity 0.2s;
`;

const ContentsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FoldHandler = styled.div`
  color: var(--white-disabled-38, rgba(255, 255, 255, 0.38));
  font-size: 13px;
  font-weight: 400;
  line-height: 160%; /* 20.8px */
  letter-spacing: -0.52px;
  text-decoration-line: underline;
`;

const Details = styled.div`
  padding-left: 32px;

  color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
  font-size: 14px;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.56px;
`;
