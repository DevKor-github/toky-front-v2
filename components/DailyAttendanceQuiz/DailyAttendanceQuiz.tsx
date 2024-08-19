import styled from 'styled-components';
import QuizButton from '../QuizButton';
import { useState } from 'react';
import { ResultBadge } from './ResultBadge';
import { Icon } from '@/libs/design-system/icons';

export function DailyAttendanceQuiz() {
  const quiz = {
    question: '서장훈은 고려대 출신 농구선수이다',
    quizId: 1,
  };

  // TODO: API call 서버에서 isAnswered, isCorrect 받아오기
  const [isAnswered, setIsAnswered] = useState<boolean>(false);

  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleAnswer = (answer: 'O' | 'X') => {
    setIsAnswered(true);

    const serverAnswer = 'X';
    // TODO: API call

    if (answer === serverAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  // TODO: QuizQuestion의 width를 길이에 따라 조절할지 고민

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
        <DailyAttendanceQuizQuestion>{quiz.question}</DailyAttendanceQuizQuestion>
        <ButtonContainer isAnswered={isAnswered}>
          <QuizButton type="O" onAnswer={handleAnswer} />
          <QuizButton type="X" onAnswer={handleAnswer} />
        </ButtonContainer>
        {isAnswered && <ResultBadge type={isCorrect} />}
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
  height: 310px;
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
  padding-top: 18px;
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.8px;
`;

const ButtonContainer = styled.div<{ isAnswered: Boolean }>`
  pointer-events: ${({ isAnswered }) => (isAnswered ? 'none' : 'auto')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  gap: 20px;
`;
