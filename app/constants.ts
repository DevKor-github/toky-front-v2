import { IconButtonProps } from '@/components/IconButton/IconButton';

interface IconInfo {
  [key: string]: IconButtonProps;
}

interface Event {
  title: string;
  time: string;
  location: string;
  img: string;
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
  '9/20 (금)': [
    {
      title: '합동응원전',
      time: '18:00',
      location: '연세대학교 노천극장',
      img: '/image-proxy/home/cheerv2.png',
    },
  ],
  '9/27 (금)': [
    {
      title: '야구',
      time: '11:00',
      location: '목동 야구장',
      img: '/image-proxy/home/baseballv2.png',
    },
    {
      title: '아이스하키',
      time: '14:00',
      location: '목동 아이스링크',
      img: '/image-proxy/home/icehockeyv2.png',
    },
    {
      title: '농구',
      time: '17:00',
      location: '고양 운동장',
      img: '/image-proxy/home/basketballv2.png',
    },
  ],
  '9/28 (토)': [
    {
      title: '축구',
      time: '14:00',
      location: '고양 운동장',
      img: '/image-proxy/home/footballv2.png',
    },
  ],
};

export const MESSAGE_INFO: MessageInfo = {
  kakaoLogin: '10초만에 로그인하고\n승부예측 참여하세요',
  inviteFriends: '친구 초대하면\n둘다 응모권 1장!',
};

export const ICON_INFO_LIST = Object.values(ICON_INFO);

interface AdBannerInfo {
  imgUrl: string;
  link: string;
}

export const AD_BANNER_LIST: AdBannerInfo[] = [
  {
    imgUrl: '/image-proxy/home/sportsku_recurit.png',
    link: 'https://blog.naver.com/sportsku',
  },
  {
    imgUrl: '/image-proxy/home/yonseisports_recurit.png',
    link: 'https://post.naver.com/my.naver?memberNo=1322423',
  },
  {
    imgUrl: '/image-proxy/home/easy_ai.png',
    link: 'https://www.medicisoft.com',
  },
  {
    imgUrl: '/image-proxy/home/jaypub.png',
    link: 'https://jpub.tistory.com/',
  },
];
