import { SelectionType } from '@/libs/constants/sports';

export interface AnalyzeItemProps {
  matchName: string;
  koreaWin: number;
  yonseiWin: number;
}

export const TOTAL_MATCH_LIST: AnalyzeItemProps[] = [
  { matchName: '야구', koreaWin: 25, yonseiWin: 19 },
  { matchName: '축구', koreaWin: 21, yonseiWin: 17 },
  { matchName: '농구', koreaWin: 24, yonseiWin: 22 },
  { matchName: '럭비', koreaWin: 21, yonseiWin: 25 },
  { matchName: '빙구', koreaWin: 17, yonseiWin: 24 },
];

export const MATCH_INFO = [
  {
    day: '9/27 (금)',
    time: '14:30',
    bannerImageUrl: '/api/image-proxy/test-5-0.png',
    recordImageUrl: '/api/image-proxy/test-5-0.png',
    startDate: new Date('2024-09-27T14:30:00'),
  },
  {
    day: '9/27 (금)',
    time: '14:30',
    bannerImageUrl: '/api/image-proxy/test-5-0.png',
    recordImageUrl: '/api/image-proxy/test-5-0.png',
    startDate: new Date('2024-09-27T14:30:00'),
  },
  {
    day: '9/27 (금)',
    time: '14:30',
    bannerImageUrl: '/api/image-proxy/test-5-0.png',
    recordImageUrl: '/api/image-proxy/test-5-0.png',
    startDate: new Date('2024-09-27T14:30:00'),
  },
  {
    day: '9/27 (금)',
    time: '14:30',
    bannerImageUrl: '/api/image-proxy/test-5-0.png',
    recordImageUrl: '/api/image-proxy/test-5-0.png',
    startDate: new Date('2024-09-27T14:30:00'),
  },
  {
    day: '9/27 (금)',
    time: '14:30',
    bannerImageUrl: '/api/image-proxy/test-5-0.png',
    recordImageUrl: '/api/image-proxy/test-5-0.png',
    startDate: new Date('2024-09-27T14:30:00'),
  },
];

export interface BestPlayerInfo {
  alias: string;
  name: string;
  position: string;
  backNumber: number;
  body: string;
  stat: string;
  imageUrl: string;
  description: string;
  department: string;
  isKorea: boolean;
}

type BestPlayer = {
  [key in Exclude<SelectionType, 'All'>]: BestPlayerInfo[];
};

export const BEST_PLAYER_LIST: BestPlayer = {
  Baseball: [
    {
      alias: 'KU슛돌이',
      name: '이상호',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '고려대학교의 최고 투수최고최고최고최고최고최고최고최고',
      department: '체육학부',
      isKorea: true,
    },
    {
      alias: 'YUㅇㄹㅇㄹ',
      name: '안세용',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '고려대학교의 최고 투수최고최고최고최고최고최고최고최고',
      department: '체육학부',
      isKorea: false,
    },
  ],
  Basketball: [
    {
      alias: 'KU',
      name: '고려대학교',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '고려대학교의 최고 투수최고최고최고최고최고최고최고최고',
      department: '체육학부',
      isKorea: true,
    },
    {
      alias: 'YU',
      name: '연세대학교',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '연세대학교의 최고 투수',
      department: '체육학부',
      isKorea: false,
    },
  ],
  Hockey: [
    {
      alias: 'KU',
      name: '고려대학교',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '고려대학교의 최고 투수',
      department: '체육학부',
      isKorea: true,
    },
    {
      alias: 'YU',
      name: '연세대학교',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '연세대학교의 최고 투수',
      department: '체육학부',
      isKorea: false,
    },
  ],
  Rugby: [
    {
      alias: 'KU',
      name: '고려대학교',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '고려대학교의 최고 투수',
      department: '체육학부',
      isKorea: true,
    },
    {
      alias: 'YU',
      name: '연세대학교',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '연세대학교의 최고 투수',
      department: '체육학부',
      isKorea: false,
    },
  ],
  Soccer: [
    {
      alias: 'KU',
      name: '고려대학교',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '고려대학교의 최고 투수',
      department: '체육학부',
      isKorea: true,
    },
    {
      alias: 'YU',
      name: '연세대학교',
      position: '투수',
      backNumber: 1,
      body: '우투좌타',
      stat: 'ERA 2.00',
      imageUrl: '/api/image-proxy/test-5-0.png',
      description: '연세대학교의 최고 투수',
      department: '체육학부',
      isKorea: false,
    },
  ],
};
