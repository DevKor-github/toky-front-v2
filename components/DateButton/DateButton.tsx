import styled from 'styled-components';

export interface DateButtonProps {
  type: 'default' | 'today' | 'checked';
  date: string;
}

export function DateButton({ type, date }: DateButtonProps) {
  return (
    <StyledDateButton className={`date-button ${type}`} type={type} date={date}>
      {type !== 'checked' ? date : '✔'}
    </StyledDateButton>
  );
}

const StyledDateButton = styled.button<DateButtonProps>`
  width: 26px;
  height: 26px;
  border-radius: 99px;
  background-color: ${({ type }) => (type === 'checked' ? '#C33DEF' : 'transparent')};
  color: rgba(255, 255, 255, 0.87);
  border: ${({ type }) => (type === 'today' ? '1px solid rgba(255, 255, 255, 0.87)' : 'transparent')};
`;
