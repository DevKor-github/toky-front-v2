import { useQuery } from '@tanstack/react-query';
import client from '../client/client';
import { SelectionType } from '@/libs/constants/sports';
import { APIBetInterface, APIQuestionInterface } from '@/libs/types/bets';

// Request Interfaces

// Response Interfaces
interface ShareScore {
  numWinKorea: number;
  numWinYonsei: number;
  numDraw: number;
}

export type BetQuestions = { [key in Exclude<SelectionType, 'all'>]: APIQuestionInterface[] };

export type MyBets = { [key in Exclude<SelectionType, 'all'>]: APIBetInterface[] };

// Axios Async Func
const getShareScore = async () => {
  const response = await client.get<ShareScore>('/bets/share');
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

// Query Hook
export const useGetShareScore = () => {
  return useQuery({
    queryKey: ['bets-share'],
    queryFn: getShareScore,
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
