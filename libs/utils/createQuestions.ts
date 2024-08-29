import { BetQuestions, MyBets } from '@/libs/apis/bets';
import { SelectionType } from '@/libs/constants/sports';
import { QuestionType } from '@/libs/types/bets';

export function createQuestions(
  betQuestions: BetQuestions,
  myBets: MyBets | undefined,
): { [key in Exclude<SelectionType, 'all'>]: QuestionType[] } {
  if (betQuestions === undefined) return initialData;

  const questions: { [key in Exclude<SelectionType, 'all'>]: QuestionType[] } = {
    baseball: [],
    basketball: [],
    football: [],
    icehockey: [],
    rugby: [],
  };

  const questionKey = Object.keys(betQuestions) as Array<Exclude<SelectionType, 'all'>>;
  questionKey.map((sports) => {
    questions[sports] = betQuestions[sports].map((question, ind) => {
      let myAnswer: number | null = null;
      if (myBets !== undefined) {
        if (myBets[sports][ind].questionId === question.questionId) {
          myAnswer = myBets[sports][ind].myAnswer;
        } else {
          const curQuestionElement = myBets[sports].find((element) => element.questionId === question.questionId);
          if (curQuestionElement !== undefined) {
            myAnswer = curQuestionElement.myAnswer;
          }
        }
      }
      return {
        questionId: question.questionId,
        description: question.description,
        choices: question.choices,
        percentage: question.percentage,
        realAnswer: question.realAnswer,
        myAnswer,
      };
    });
  });
  return questions;
}

const initialData: { [key in Exclude<SelectionType, 'all'>]: QuestionType[] } = {
  baseball: [
    {
      questionId: 1,
      description: '승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 2,
      description: '먼저 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '득점없음', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 3,
      description: '경기에서 홈런이 몇 개 나올 지 예측해주세요',
      choices: ['0개', '1개', '2개 이상'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 4,
      description: '삼진아웃을 먼저 당하는 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null],
    },
    {
      questionId: 5,
      description: '안타 개수가 많을 팀을 예측해주세요',
      choices: ['고려대', '동률', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
  ],
  football: [
    {
      questionId: 6,
      description: '승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 7,
      description: '몇 점 차이로 경기가 종료될 지 예측해주세요',
      choices: ['1점 이내', '2점', '3점 이상'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 8,
      description: '먼저 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '득점없음', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 9,
      description: '먼저 코너킥을 얻을 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null],
    },
    {
      questionId: 10,
      description: '카드를 먼저 받을 팀을 예측해주세요',
      choices: ['고려대', '없음', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
  ],
  basketball: [
    {
      questionId: 11,
      description: '승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 12,
      description: '첫 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null],
    },
    {
      questionId: 13,
      description: '마지막 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null],
    },
    {
      questionId: 14,
      description: '가장 많은 득점을 기록할 선수의 소속을 예측해주세요',
      choices: ['고려대', '양 팀 동일', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 15,
      description: '2쿼터 종료 후 앞서고 있을 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
  ],
  rugby: [
    {
      questionId: 16,
      description: '승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 17,
      description: '첫 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null],
    },
    {
      questionId: 18,
      description: '마지막 득점에 성공할 팀을 예측해주세요',
      choices: ['고려대', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null],
    },
    {
      questionId: 19,
      description: '양 팀 점수의 총합을 예측해주세요',
      choices: ['45점 이내', '46~55점', '56점 이상'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 20,
      description: '전반전 종료 후 앞서고 있을 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
  ],
  icehockey: [
    {
      questionId: 21,
      description: '승리할 팀을 예측해주세요',
      choices: ['고려대', '무승부', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 22,
      description: '두 학교의 점수 차를 예측해주세요',
      choices: ['동점', '1~2점', '3점 이상'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 23,
      description: '첫 득점이 발생할 시간을 예측해주세요',
      choices: ['3분 이내', '3~5분', '5분 이상'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 24,
      description: '반칙을 더 많이 할 팀을 예측해주세요',
      choices: ['고려대', '양 팀 동일', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
    {
      questionId: 25,
      description: '가장 많은 득점을 기록할 선수의 소속을 예측해 주세요',
      choices: ['고려대', '양 팀 동일', '연세대'],
      realAnswer: null,
      myAnswer: null,
      percentage: [null, null, null],
    },
  ],
};
