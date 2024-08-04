import { IconButtonProps } from '@/components/IconButton/IconButton';

interface IconInfo {
  [key: string]: IconButtonProps;
}

interface Event {
  title: string;
  time: string;
  location: string;
}

interface ScheduleInfo {
  [date: string]: Event[];
}

interface MessageInfo {
  [key: string]: string;
}

const ICON_INFO: IconInfo = {
  bets: {
    href: '/bets',
    icon: 'Vs',
    text: '승부예측',
    type: 'primary',
  },
  analyze: {
    href: '/analyze',
    icon: 'ScoreBoard',
    text: '전력분석',
    type: 'primary',
  },
  attendance: {
    href: '/attendance',
    icon: 'Stamp',
    text: '출석체크',
    type: 'secondary',
  },
  draw: {
    href: '/draw',
    icon: 'Ticket',
    text: '경품응모',
    type: 'secondary',
  },
};

export const SCHEDULE_INFO: ScheduleInfo = {
  '9/25 (수)': [
    {
      title: '합동응원전',
      time: '18:00',
      location: '고려대학교 화정체육관',
    },
  ],
  '9/27 (금)': [
    {
      title: '야구',
      time: '12:00',
      location: '목동 야구장',
    },
    {
      title: '농구',
      time: '16:00',
      location: '고양 농구장',
    },
    {
      title: '아이스하키',
      time: '16:00',
      location: '목동 아이스링크',
    },
  ],
  '9/28 (토)': [
    {
      title: '럭비',
      time: '12:00',
      location: '고양 운동장',
    },
    {
      title: '축구',
      time: '16:00',
      location: '고양 운동장',
    },
  ],
};

export const MESSAGE_INFO: MessageInfo = {
  kakaoLogin: '10초만에 로그인하고\n승부예측 참여하세요',
  inviteFriends: '친구 초대하면\n둘다 응모권 1장!',
};

export const ICON_INFO_LIST = Object.values(ICON_INFO);
