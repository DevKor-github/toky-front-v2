export const SelectionArray = [
  { type: 'baseball', title: '야구' },
  { type: 'icehockey', title: '빙구' },
  { type: 'basketball', title: '농구' },
  { type: 'football', title: '축구' },
  { type: 'rugby', title: '럭비' },
] as const;

export const PlaySportsArray = SelectionArray.slice(0, 4) as Exclude<
  (typeof SelectionArray)[number],
  {
    readonly type: 'rugby';
    readonly title: '럭비';
  }
>[];

export type SelectionType = (typeof SelectionArray)[number]['type'] | 'all';

export const SelectionMap: { [key in Exclude<SelectionType, 'all'>]: number } = {
  baseball: 0,
  icehockey: 1,
  basketball: 2,
  football: 3,
  rugby: 4,
};

export const LastDate = new Date('2024-09-28T23:59:59+09:00');

export const MATCH_SCHEDULE = [
  {
    title: '야구',
    day: '9/27 (금)',
    time: '11:00',
    startDate: new Date('2024-09-27T11:00:00'),
  },
  {
    title: '빙구',
    day: '9/27 (금)',
    time: '14:00',
    startDate: new Date('2024-09-27T14:00:00'),
  },
  {
    title: '농구',
    day: '9/27 (금)',
    time: '17:00',
    startDate: new Date('2024-09-27T17:00:00'),
  },
  {
    title: '축구',
    day: '9/28 (토)',
    time: '14:00',
    startDate: new Date('2024-09-28T14:00:00'),
  },
  {
    title: '럭비',
    day: '9/27 (금)',
    time: '14:30',
    startDate: new Date('2024-09-27T14:30:00'),
  },
];
