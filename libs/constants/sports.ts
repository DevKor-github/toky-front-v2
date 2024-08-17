export const SelectionArray = [
  { type: 'Baseball', title: '야구' },
  { type: 'Soccer', title: '축구' },
  { type: 'Basketball', title: '농구' },
  { type: 'Rugby', title: '럭비' },
  { type: 'Hockey', title: '빙구' },
] as const;

export type SelectionType = (typeof SelectionArray)[number]['type'] | 'All';

export const SelectionMap: { [key in Exclude<SelectionType, 'All'>]: number } = {
  Baseball: 0,
  Soccer: 1,
  Basketball: 2,
  Rugby: 3,
  Hockey: 4,
};

export const LastDate = new Date('2024-09-28T23:59:59+09:00');

export const MATCH_SCHEDULE = [
  {
    title: '야구',
    day: '9/27 (금)',
    time: '14:30',
    startDate: new Date('2024-09-27T14:30:00'),
  },
  {
    title: '축구',
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
  {
    title: '럭비',
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
];
