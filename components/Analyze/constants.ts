import { MATCH_SCHEDULE, SelectionType } from '@/libs/constants/sports';

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

export const MATCH_INFO = MATCH_SCHEDULE;

export interface BestPlayerInfo {
  alias: string;
  name: string;
  position: string;
  backNumber: number;
  body: string;
  imageUrl: string;
  description: string;
  department: string;
  isKorea: boolean;
}

type BestPlayer = {
  [key in Exclude<SelectionType, 'all'>]: BestPlayerInfo[];
};

export const BEST_PLAYER_LIST: BestPlayer = {
  baseball: [
    {
      alias: '2023정기전 4안타',
      name: '박건우',
      position: '포수',
      backNumber: 25,
      body: '185/90',
      imageUrl: '/image-proxy/analyze/korea_baseball_parkgeonwoo.png',
      description: '“2024년에는\n 무조건 이기는 경기를 보여주겠다”',
      department: '체육교육과 21',
      isKorea: true,
    },
    {
      alias: '푸른야구를 이끌',
      name: '성준한',
      position: '외야수',
      backNumber: 17,
      body: '174/66',
      imageUrl: '/image-proxy/analyze/yonsei_baseball_seongjoonhan.png',
      description: `“팀 목표는\n정기 연고전 5연승입니다”`,
      department: '스포츠응용산업학과20',
      isKorea: false,
    },
  ],
  basketball: [
    {
      alias: '유도의 피',
      name: '김태훈',
      position: '포워드',
      backNumber: 9,
      body: '190/86',
      imageUrl: '/image-proxy/analyze/korea_basketball_kimtaehoon.png',
      description:
        '“민족 고대답게 목표를 꼭 이룰 수\n 있도록 최선을 다하겠습니다.” 최고 투수최고최고최고최고최고최고최고최고',
      department: '체육교육과 21',
      isKorea: true,
    },
    {
      alias: '연대 스마일보이',
      name: '최형찬',
      position: '가드',
      backNumber: 17,
      body: '189/84',
      imageUrl: '/image-proxy/analyze/yonsei_basketball_choihyungchan.png',
      description: '“코트 안에서 모든걸 쏟아붇겠습니다”',
      department: '체육교육학과 21',
      isKorea: false,
    },
  ],
  icehockey: [
    {
      alias: '21학번 최강 포워드',
      name: '이윤석',
      position: 'FW',
      backNumber: 72,
      body: '184/85',
      imageUrl: '/image-proxy/analyze/korea_icehockey_leeyoonseok.png',
      description: '“작년보다 더 멋있고 재밌는 경기\n 보여드리겠습니다”',
      department: '체육교육과 21',
      isKorea: true,
    },
    {
      alias: '전방위 플레이',
      name: '유태웅',
      position: 'DF',
      backNumber: 81,
      body: '180/76',
      imageUrl: '/image-proxy/analyze/yonsei_icehockey_youtaewoong.png',
      description: '“역사에 남는 한해를 만들고\n 졸업하겠다”',
      department: '스포츠응용산업학과21',
      isKorea: false,
    },
  ],
  rugby: [
    {
      alias: '',
      name: '',
      position: '',
      backNumber: 1,
      body: '',
      imageUrl: '/image-proxy/test-5-0.png',
      description: '',
      department: '',
      isKorea: true,
    },
    {
      alias: '',
      name: '',
      position: '',
      backNumber: 1,
      body: '',
      imageUrl: '/image-proxy/test-5-0.png',
      description: '',
      department: '',
      isKorea: false,
    },
  ],
  football: [
    {
      alias: '에이스의 품격',
      name: '이지호',
      position: 'FW',
      backNumber: 10,
      body: '183/74',
      imageUrl: '/image-proxy/analyze/korea_football_leejiho.png',
      description: '"차근차근 빌드업하겠습니다.\n 고대의 승리를 향해서"',
      department: '체육교육과 21',
      isKorea: true,
    },
    {
      alias: '화끈한 플레이',
      name: '장유민',
      position: 'LW, RWB',
      backNumber: 16,
      body: '179/73',
      imageUrl: '/image-proxy/analyze/yonsei_football_jangyoumin.png',
      description: '“24년 연고전은 5:0 연세대 승으로\n하기로 결정했습니다"',
      department: '체육학부',
      isKorea: false,
    },
  ],
};

export const BEST_PLAYER_IMAGE = {
  baseball: '/image-proxy/analyze/baseball_mainplayer.png',
  basketball: '/image-proxy/analyze/basketball_mainplayer.png',
  icehockey: '/image-proxy/analyze/icehockey_mainplayer.png',
  rugby: '/image-proxy/analyze/rugby_mainplayer.png',
  football: '/image-proxy/analyze/football_mainplayer.png',
};
