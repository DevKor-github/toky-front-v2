import { SelectionType } from '@/libs/constants/sports';
import { QuestionType } from '@/libs/types/bets';

// TODO: Dummy Data
export const DUMMY_QUESTIONS_API: { [key in Exclude<SelectionType, 'All'>]: QuestionType[] } = {
  Baseball: [
    {
      questionId: 0,
      description: '야구 승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      percentage: [60, 20, 20],
      answer: null,
    },
    {
      questionId: 1,
      description: '먼저 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '득점 없음', '연세대'],
      percentage: [50, 23, 27],
      answer: null,
    },
    {
      questionId: 2,
      description: '경기에서 홈런이 몇 개 나올 지 예측해주세요',
      choices: ['0개', '1개', '2개 이상'],
      percentage: [20, 43, 37],
      answer: null,
    },
    {
      questionId: 3,
      description: '삼진아웃을 먼저 당하는 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      percentage: [32, 68],
      answer: null,
    },
    {
      questionId: 4,
      description: '안타 개수가 많을 팀을 예측해주세요',
      choices: ['고려대', '동률', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
  ],
  Soccer: [
    {
      questionId: 20,
      description: '축구 승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      percentage: [60, 20, 20],
      answer: null,
    },
    {
      questionId: 21,
      description: '몇 점 차이로 종료할지 예측해주세요',
      choices: ['1점 이내', '2점', '3점 이상'],
      percentage: [50, 23, 27],
      answer: null,
    },
    {
      questionId: 22,
      description: '먼저 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '득점 없음', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
    {
      questionId: 23,
      description: '삼진아웃을 먼저 당하는 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      percentage: [32, 68],
      answer: null,
    },
    {
      questionId: 24,
      description: '안타 개수가 많을 팀을 예측해주세요',
      choices: ['고려대', '동률', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
  ],
  Basketball: [
    {
      questionId: 5,
      description: '농구 승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      percentage: [60, 20, 20],
      answer: null,
    },
    {
      questionId: 6,
      description: '몇 점 차이로 종료할지 예측해주세요',
      choices: ['1점 이내', '2점', '3점 이상'],
      percentage: [50, 23, 27],
      answer: null,
    },
    {
      questionId: 7,
      description: '먼저 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '득점 없음', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
    {
      questionId: 8,
      description: '삼진아웃을 먼저 당하는 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      percentage: [32, 68],
      answer: null,
    },
    {
      questionId: 9,
      description: '안타 개수가 많을 팀을 예측해주세요',
      choices: ['고려대', '동률', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
  ],
  Rugby: [
    {
      questionId: 15,
      description: '럭비 승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      percentage: [60, 20, 20],
      answer: null,
    },
    {
      questionId: 16,
      description: '몇 점 차이로 종료할지 예측해주세요',
      choices: ['1점 이내', '2점', '3점 이상'],
      percentage: [50, 23, 27],
      answer: null,
    },
    {
      questionId: 17,
      description: '먼저 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '득점 없음', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
    {
      questionId: 18,
      description: '삼진아웃을 먼저 당하는 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      percentage: [32, 68],
      answer: null,
    },
    {
      questionId: 19,
      description: '안타 개수가 많을 팀을 예측해주세요',
      choices: ['고려대', '동률', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
  ],
  Hockey: [
    {
      questionId: 10,
      description: '빙구 승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      percentage: [60, 20, 20],
      answer: null,
    },
    {
      questionId: 11,
      description: '몇 점 차이로 종료할지 예측해주세요',
      choices: ['1점 이내', '2점', '3점 이상'],
      percentage: [50, 23, 27],
      answer: null,
    },
    {
      questionId: 12,
      description: '먼저 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '득점 없음', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
    {
      questionId: 13,
      description: '삼진아웃을 먼저 당하는 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      percentage: [32, 68],
      answer: null,
    },
    {
      questionId: 14,
      description: '안타 개수가 많을 팀을 예측해주세요',
      choices: ['고려대', '동률', '연세대'],
      percentage: [20, 43, 37],
      answer: null,
    },
  ],
};
