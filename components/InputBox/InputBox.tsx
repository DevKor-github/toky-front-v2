import styled from 'styled-components';
import { useState } from 'react';

import { useSignupError } from '@/app/signup/store';

type StatusType = 'default' | 'focus' | 'filled';

interface InputBoxProps {
  type?: 'new' | 'edit';
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  error?: boolean;
  clearError?: () => void;
  validationButton?: {
    text: string;
    onClick: () => void;
  };
}
export function InputBox({
  type = 'new',
  value,
  setValue,
  placeholder,
  maxLength,
  error = false,
  validationButton,
  clearError,
}: InputBoxProps) {
  const [status, setStatus] = useState<StatusType>('default');
  const errorState = useSignupError();

  return (
    <Wrapper>
      <Input
        $status={status}
        $error={error}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        onFocus={() => {
          setStatus('focus');
          clearError && clearError();
        }}
        onBlur={() => {
          if (value.length !== 0 && type === 'new') {
            setStatus('filled');
          } else {
            setStatus('default');
          }
        }}
        maxLength={maxLength}
      ></Input>
      {validationButton && (
        <ValidationButton onClick={validationButton.onClick}>{validationButton.text}</ValidationButton>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const Input = styled.input<{ $status: StatusType; $error?: boolean }>`
  padding: 16px;
  border: none;
  outline: none;
  background: none;

  border-radius: 8px;
  border: 1px solid;
  border-color: ${({ $status, $error }) => {
    if ($error) return `var(--Light-Red, #F95B6E)`;
    switch ($status) {
      case 'focus':
      case 'filled':
        return `var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87))`;
      case 'default':
        return `var(--white-15, rgba(255, 255, 255, 0.15))`;
    }
  }};

  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 15px;
  letter-spacing: -0.6px;

  &::placeholder {
    color: var(--white-disabled-38, rgba(255, 255, 255, 0.38));
  }

  transition: all 0.2s;
`;

const ValidationButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translate3d(0, -50%, 0);

  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.56px;
`;
