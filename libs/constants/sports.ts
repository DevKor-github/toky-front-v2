export const SelectionArray = [
  { type: 'baseball', title: '야구' },
  { type: 'icehockey', title: '빙구' },
  { type: 'basketball', title: '농구' },
  { type: 'rugby', title: '럭비' },
  { type: 'football', title: '축구' },
] as const;

export type SelectionType = (typeof SelectionArray)[number]['type'] | 'all';

export const SelectionMap: { [key in Exclude<SelectionType, 'all'>]: number } = {
  baseball: 0,
  icehockey: 1,
  basketball: 2,
  rugby: 3,
  football: 4,
};

export const LastDate = new Date('2024-09-28T23:59:59+09:00');

// TODO: 일정 수정
export const MATCH_SCHEDULE = [
  {
    title: '야구',
    day: '9/27 (금)',
    time: '14:30',
    startDate: new Date('2024-09-27T14:30:00'),
  },
  {
    title: '빙구',
    day: '9/27 (금)',
    time: '14:30',
    startDate: new Date('2024-09-27T14:30:00'),
  },
  {
    title: '농구',
    day: '9/27 (금)',
    time: '14:30',
    startDate: new Date('2024-09-27T14:30:00'),
  },
  // {
  //   title: '럭비',
  //   day: '9/27 (금)',
  //   time: '14:30',
  //   startDate: new Date('2024-09-27T14:30:00'),
  // },
  {
    title: '축구',
    day: '9/27 (금)',
    time: '14:30',
    startDate: new Date('2024-09-27T14:30:00'),
  },
];
