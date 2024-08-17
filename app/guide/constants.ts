import { MATCH_SCHEDULE } from '@/libs/constants/sports';

const SCHEDULECARD_IMAGE = [
  {
    imageUrl: '/api/image-proxy/guide/hockey.png',
  },
  {
    imageUrl: '/api/image-proxy/guide/hockey.png',
  },
  {
    imageUrl: '/api/image-proxy/guide/hockey.png',
  },
  {
    imageUrl: '/api/image-proxy/guide/hockey.png',
  },
  {
    imageUrl: '/api/image-proxy/guide/hockey.png',
  },
];

export const GUIDE_INFO = MATCH_SCHEDULE.map((match, index) => {
  return {
    ...match,
    imageUrl: SCHEDULECARD_IMAGE[index].imageUrl,
  };
});
