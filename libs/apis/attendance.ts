import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../client/client';

interface AttendanceInfo {
  attendanceHistory: {
    attendanceDate: string;
    isAnswerCorrect: boolean;
  }[];
  today: string;
  quizId: number;
  question: string;
  todayAttendance: boolean;
  isMyAnswerCorrect: boolean | null;
  todayAnswer: boolean | null;
}

interface AnswerInfo {
  answer: boolean;
}

const getAttendance = async () => {
  const response = await client.get<AttendanceInfo>('/attendance-check');
  return response.data;
};

const postAttendance = async (params: AnswerInfo) => {
  const response = await client.post('/attendance-check', params);
  return response;
};

export const useGetAttendance = () => {
  return useQuery({
    queryKey: ['attendance-check'],
    queryFn: getAttendance,
    retry: false,
  });
};

export const usePostAttendance = () => {
  return useMutation({ mutationFn: postAttendance });
};
