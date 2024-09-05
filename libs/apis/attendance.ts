import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../client/client';

interface TodayQuizInfo {
  today: string;
  quizId: number;
  question: string;
}

interface MyAttendanceInfo {
  attendanceHistory: {
    attendanceDate: string;
    isAnswerCorrect: boolean;
  }[];
  todayAttendance: boolean;
  isMyAnswerCorrect: boolean | null;
  todayAnswer: boolean | null;
}

interface AnswerInfo {
  answer: boolean;
}

const getTodayQuiz = async () => {
  const response = await client.get<TodayQuizInfo>('/attendance-check/today-quiz');
  return response.data;
};

const getMyAttendance = async () => {
  const response = await client.get<MyAttendanceInfo>('/attendance-check/my-attendance');
  return response.data;
};

const postAttendance = async (params: AnswerInfo) => {
  const response = await client.post('/attendance-check', params);
  return response;
};

export const useGetTodayQuiz = () => {
  return useQuery({
    queryKey: ['today-quiz'],
    queryFn: getTodayQuiz,
  });
};

export const useGetMyAttendance = () => {
  return useQuery({
    queryKey: ['attendance-check'],
    queryFn: getMyAttendance,
    retry: false,
    enabled: false,
  });
};

export const usePostAttendance = () => {
  return useMutation({ mutationFn: postAttendance });
};
