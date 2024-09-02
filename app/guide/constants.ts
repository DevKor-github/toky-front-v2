import { MATCH_SCHEDULE } from '@/libs/constants/sports';

const SCHEDULECARD_IMAGE = [
  {
    imageUrl: '/image-proxy/guide/baseballv2.png',
  },
  {
    imageUrl: '/image-proxy/guide/basketballv2.png',
  },
  {
    imageUrl: '/image-proxy/guide/icehockeyv2.png',
  },
  {
    imageUrl: '/image-proxy/guide/footballv2.png',
  },
];

export const GUIDE_INFO = MATCH_SCHEDULE.map((match, index) => {
  return {
    ...match,
    imageUrl: SCHEDULECARD_IMAGE[index].imageUrl,
  };
});
