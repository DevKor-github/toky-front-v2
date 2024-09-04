import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../client/client';
import { SelectionType } from '@/libs/constants/sports';
import { APIBetInterface, APIQuestionInterface } from '@/libs/types/bets';

// Request Interfaces

interface PostBetRequest {
  questionId: number;
  answer: number;
  sports: Exclude<SelectionType, 'all'>;
}

// Response Interfaces
interface ShareScore {
  numWinKorea: number;
  numWinYonsei: number;
  numDraw: number;
}

export type BetQuestions = { [key in Exclude<SelectionType, 'all'>]: APIQuestionInterface[] };

export type MyBets = { [key in Exclude<SelectionType, 'all'>]: APIBetInterface[] };

interface PostBetResponse {
  percentage: number[];
}

// Axios Async Func
const getShareScore = async () => {
  const response = await client.get<ShareScore>('/bets/share/prediction');
  return response.data;
};

const getBetQuestions = async () => {
  const response = await client.get<BetQuestions>('/bets/questions');
  return response.data;
};

const getMyBets = async () => {
  const response = await client.get<MyBets>('/bets/bet');
  return response.data;
};

const postBet = async ({ questionId, answer }: PostBetRequest) => {
  const response = await client.post<PostBetResponse>('/bets/bet', {
    questionId,
    answer,
  });
  return response.data;
};

const postShareBenefit = async () => {
  const response = await client.post<number>('/bets/share/prediction');
  return response;
};

export const useGetShareScore = () => {
  return useQuery({
    queryKey: ['bets-share'],
    queryFn: getShareScore,
    enabled: false,
  });
};

/**
 * 질문 목록 및 각 질문 별 전체 사용자의 베팅 비율을 반환합니다.
 */
export const useGetBetQuestions = () => {
  return useQuery({
    queryKey: ['bets-question'],
    queryFn: getBetQuestions,
  });
};

/**
 * 각 질문별로 사용자가 배팅한 항목들을 조회합니다.
 */
export const useGetMyBets = () => {
  return useQuery({
    queryKey: ['my-bets'],
    queryFn: getMyBets,
    enabled: false,
  });
};

/**
 * 각 질문별로 베팅을 수행합니다. 이미 베팅한 적이 있으면 베팅을 수정합니다.
 */
export const usePostBet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postBet,
    onSuccess: (response, request) => {
      const sports = request.sports;
      queryClient.setQueryData<MyBets>(['my-bets'], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            [sports]: oldData[sports].map((question) => {
              if (question.questionId === request.questionId) {
                return {
                  ...question,
                  myAnswer: request.answer,
                };
              }
              return { ...question };
            }),
          };
        }
      });
      queryClient.setQueryData<BetQuestions>(['bets-question'], (oldData) => {
        if (oldData) {
          return {
            ...oldData,
            [sports]: oldData[sports].map((question) => {
              if (question.questionId === request.questionId) {
                return { ...question, percentage: response.percentage };
              }
              return { ...question };
            }),
          };
        }
      });
    },
  });
};

export const usePostShare = (onSuccessFunction: (ticket: number) => void) => {
  return useMutation({ mutationFn: postShareBenefit, onSuccess: (data) => onSuccessFunction(data.data) });
};
