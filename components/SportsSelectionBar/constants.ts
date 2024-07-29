export const SelectionArray = [
  { type: 'Baseball', title: '야구' },
  { type: 'Soccer', title: '축구' },
  { type: 'Basketball', title: '농구' },
  { type: 'Rugby', title: '럭비' },
  { type: 'Hockey', title: '빙구' },
] as const;

export type SelectionType = (typeof SelectionArray)[number]['type'] | 'All';
