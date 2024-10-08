import styled from 'styled-components';
import QuizButton from '../QuizButton';
import { useEffect, useState } from 'react';
import { ResultBadge } from './ResultBadge';
import { Icon } from '@/libs/design-system/icons';
import { usePostAttendance } from '@/libs/apis/attendance';
import { useLoginModal } from '@/components/LoginModal/useLoginModal';
import { useToast } from '@/components/Toast';
import { useTicketStore } from '@/libs/store/Providers/TicketStoreProvider';
import { sendGAEvent } from '@next/third-parties/google';

interface DailyAttendanceQuizProps {
  question: string;
  quizId: number;
  todayAttendance: boolean;
  isMyAnswerCorrect?: boolean | null;
  todayAnswer?: boolean | null;
  refetchAttendance: () => void;
}

export function DailyAttendanceQuiz({
  question,
  quizId,
  todayAttendance,
  isMyAnswerCorrect,
  todayAnswer,
  refetchAttendance,
}: DailyAttendanceQuizProps) {
  const addTickets = useTicketStore((state) => state.addTickets);
  const [isAnswered, setIsAnswered] = useState<boolean>(todayAttendance);
  const [isCorrect, setIsCorrect] = useState<boolean>(isMyAnswerCorrect ?? false);

  const getColorMode = (type: boolean) => {
    if (!todayAttendance) return false;
    return type === (isCorrect ? todayAnswer : !todayAnswer);
  };

  function onSuccess(ticket: number) {
    addTickets(ticket);
    openToast({ message: `응모권 ${ticket}장 획득!` });
  }

  const { mutate: postAttendance, data } = usePostAttendance(onSuccess);
  const { openLoginModal } = useLoginModal();
  const { openToast } = useToast();

  useEffect(() => {
    if (data) {
      setIsAnswered(true);
      setIsCorrect(data.data.correct);
      refetchAttendance();
    }
  }, [data, refetchAttendance, openToast, addTickets]);

  const handleAnswer = (answer: boolean) => {
    sendGAEvent('event', 'attendance', { answer, date: new Date().toISOString() });
    postAttendance(
      { answer: answer },
      {
        onError: (error) => {
          error.response?.status === 401 && openLoginModal();
        },
      },
    );
  };

  return (
    <Wrapper>
      <DailyAttendanceQuizArrow>
        <Icon.AttendanceQuizArrow />
      </DailyAttendanceQuizArrow>
      <DailyAttendanceQuizContainer>
        <DailyAttendanceQuizTitle>오늘의 퀴즈</DailyAttendanceQuizTitle>
        <DailyAttendanceQuizTitleStroke>
          <Icon.AttendanceQuizTitleStroke />
        </DailyAttendanceQuizTitleStroke>
        <DailyAttendanceQuizQuestion>{question}</DailyAttendanceQuizQuestion>
        <ButtonContainer $isAnswered={isAnswered}>
          <QuizButton type={true} onAnswer={handleAnswer} colorMode={getColorMode(true)} />
          <QuizButton type={false} onAnswer={handleAnswer} colorMode={getColorMode(false)} />
          {isAnswered && <ResultBadge type={isCorrect} />}
        </ButtonContainer>
      </DailyAttendanceQuizContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 16px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DailyAttendanceQuizArrow = styled.div`
  height: 13px;
`;

const DailyAttendanceQuizContainer = styled.div`
  position: relative;
  width: calc(100% - 40px);
  padding-bottom: 32px;
  margin: 0 20px 20px 20px;
  border-radius: 16px;
  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DailyAttendanceQuizTitle = styled.div`
  padding-top: 30px;
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%;
  letter-spacing: -0.56px;
`;

const DailyAttendanceQuizTitleStroke = styled.div`
  margin-top: -10px;
`;

const DailyAttendanceQuizQuestion = styled.div`
  padding: 0 10px;
  padding-top: 18px;
  word-break: keep-all;
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const ButtonContainer = styled.div<{ $isAnswered: Boolean }>`
  pointer-events: ${({ $isAnswered }) => ($isAnswered ? 'none' : 'auto')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
  position: relative;
`;
