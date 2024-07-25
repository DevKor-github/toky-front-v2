import { IconButtonProps } from '@/components/IconButton/IconButton';

interface IconInfo {
  [key: string]: IconButtonProps;
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

export const MESSAGE_INFO: MessageInfo = {
  kakaoLogin: '10초만에 로그인하고\n승부예측 참여하세요',
  inviteFriends: '친구 초대하면\n둘다 응모권 1장!',
};

export const ICON_INFO_LIST = Object.values(ICON_INFO);
