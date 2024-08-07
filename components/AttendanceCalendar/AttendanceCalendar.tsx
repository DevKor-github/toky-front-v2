import styled from 'styled-components';
import DateButton, { DateButtonProps } from '../DateButton';

export function AttendanceCalendar() {
  const userAttendanceStatus: DateButtonProps[] = [
    { type: 'checked', date: '1' },
    { type: 'default', date: '2' },
    { type: 'today', date: '3' },
    { type: 'default', date: '4' },
    { type: 'default', date: '5' },
    { type: 'default', date: '6' },
    { type: 'default', date: '7' },
    { type: 'default', date: '8' },
    { type: 'default', date: '9' },
    { type: 'default', date: '10' },
    { type: 'default', date: '11' },
    { type: 'default', date: '12' },
    { type: 'default', date: '13' },
    { type: 'default', date: '14' },
    { type: 'default', date: '15' },
    { type: 'default', date: '16' },
    { type: 'default', date: '17' },
    { type: 'default', date: '18' },
    { type: 'default', date: '19' },
    { type: 'default', date: '20' },
    { type: 'default', date: '21' },
    { type: 'default', date: '22' },
    { type: 'default', date: '23' },
    { type: 'default', date: '24' },
    { type: 'default', date: '25' },
    { type: 'default', date: '26' },
    { type: 'default', date: '27' },
    { type: 'default', date: '28' },
    { type: 'default', date: '29' },
    { type: 'default', date: '30' },
    { type: 'default', date: '31' },
  ]; // TODO: 실제 API로 변경

  return (
    <Wrapper>
      {userAttendanceStatus.map((dateButtonProps: DateButtonProps) => (
        <DateButton key={dateButtonProps.date} {...dateButtonProps} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 50px 0 50px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 8px;
  column-gap: 18px;
`;
