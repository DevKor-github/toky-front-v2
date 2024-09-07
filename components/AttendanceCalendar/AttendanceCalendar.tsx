import styled from 'styled-components';
import DateButton, { DateButtonProps } from '../DateButton';
import { ATTENDANCE_DATES } from './constants';

interface AttendanceCalendarProps {
  attendanceHistory: {
    attendanceDate: string;
    isAnswerCorrect: boolean;
  }[];
  today: string;
}

export function AttendanceCalendar(attendanceCalendarProps: AttendanceCalendarProps) {
  const userAttendanceStatus = ATTENDANCE_DATES.map((date): DateButtonProps => {
    const attendance = attendanceCalendarProps.attendanceHistory.find(
      (attendance) => attendance.attendanceDate === date.attendanceDate,
    );
    const isToday = attendanceCalendarProps.today === date.attendanceDate;
    return {
      type: isToday ? 'today' : attendance ? 'checked' : 'default',
      date: new Date(date.attendanceDate).getDate().toString(),
    };
  });

  return (
    <Wrapper>
      {userAttendanceStatus.map((dateButtonProps: DateButtonProps) => (
        <DateButton key={dateButtonProps.date} {...dateButtonProps} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 calc((100 / 390) * 50vw);
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: calc((100 / 390) * 8vw);
  column-gap: calc((100 / 390) * 18vw);
`;
