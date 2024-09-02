'use client';

import styled from 'styled-components';

import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import AttendanceCalendar from '@/components/AttendanceCalendar';
import DailyAttendanceQuiz from '@/components/DailyAttendanceQuiz';
import { Icon } from '@/libs/design-system/icons';
import { useGetAttendance } from '@/libs/apis/attendance';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';

export default function Attendance() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const { data: attendanceInfo } = useGetAttendance();

  //TODO: 백엔드에서 비로그인 상태의 attendanceInfo가 어떻게 처리되는지 확인 후 개발
  //TODO: 백엔드에 오늘 정답여부 요청

  const {
    attendanceHistory = [],
    today = '',
    question = '',
    quizId = 0,
    todayAttendance = false,
  } = attendanceInfo || {};

  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <AttendanceBanner>
          매일매일 쏟아지는 응모권!
          <Icon.AttendanceQuizBadge />
        </AttendanceBanner>
        <AttendanceStamp>
          <Icon.AttendanceStamp />
        </AttendanceStamp>
        <AttendanceTicket>
          <Icon.AttendanceTicket />
        </AttendanceTicket>
        <AttendanceCalendar attendanceHistory={attendanceHistory ?? []} today={today ?? ''} />
        <DailyAttendanceQuiz
          question={question ?? ''}
          quizId={quizId ?? 0}
          todayAttendance={todayAttendance ?? false}
        />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
  background: linear-gradient(0deg, rgba(59, 0, 225, 0) 34.53%, rgba(59, 0, 225, 0.15) 100%), #121212;
`;

const AttendanceBanner = styled.div`
  margin: 48px calc((100% - 225px) / 2) 28px calc((100% - 225px) / 2);
  align-items: center;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.56px;
`;

const AttendanceStamp = styled.div`
  position: absolute;
  top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight + 17}px;
  left: calc((100% - 255px) / 2 - 55px);
`;

const AttendanceTicket = styled.div`
  position: absolute;
  top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight + 92}px;
  right: calc((100% - 255px) / 2 - 55px);
`;
