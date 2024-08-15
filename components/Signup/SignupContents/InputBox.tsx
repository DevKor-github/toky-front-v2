import { SignupElements } from '@/app/signup/constants';
import { useSignupError } from '@/app/signup/store';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

type StatusType = 'default' | 'focus' | 'filled';

interface InputBoxProps {
  type: SignupElements;
  value: string;
  setValue: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}
export function InputBox({ type, value, setValue, placeholder, maxLength }: InputBoxProps) {
  const [status, setStatus] = useState<StatusType>('default');
  const errorState = useSignupError();

  return (
    <Input
      $status={status}
      $error={errorState.error === type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      onFocus={() => {
        setStatus('focus');
        errorState.clearError();
      }}
      onBlur={() => {
        if (value.length === 0) {
          setStatus('default');
        } else {
          setStatus('filled');
        }
      }}
      maxLength={maxLength}
    />
  );
}

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
