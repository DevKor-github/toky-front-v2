import { IconButtonProps } from '@/components/IconButton/IconButton';

interface IconInfo {
  [key: string]: IconButtonProps;
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

export const ICON_INFO_LIST = Object.values(ICON_INFO);
