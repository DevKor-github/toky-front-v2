'use client';

import styled from 'styled-components';

import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import AttendanceCalendar from '@/components/AttendanceCalendar';
import { Icon } from '@/libs/design-system/icons';

export default function Attendance() {
  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <AttendanceBanner>
          매일매일 쏟아지는 응모권!
          <Icon.AttendanceQuizIcon />
        </AttendanceBanner>
        <AttendanceStamp>
          <Icon.AttendanceStamp />
        </AttendanceStamp>
        <AttendanceTicket>
          <Icon.AttendanceTicket />
        </AttendanceTicket>
        <AttendanceCalendar />
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
  background: linear-gradient(0deg, rgba(59, 0, 225, 0) 34.53%, rgba(59, 0, 225, 0.15) 100%), #121212;
`;

const AttendanceBanner = styled.div`
  padding: 48px 83px 28px 82px;
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
  left: 25px;
`;

const AttendanceTicket = styled.div`
  position: absolute;
  top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight + 92}px;
  right: 25px;
`;
