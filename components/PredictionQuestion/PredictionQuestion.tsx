import { motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';

interface PredictionQuestionProps {
  questionId: number;
  questionIndex: number;
  questionDescription: string;
  options: string[];
  myAnswer: number | null;
  percentage: number[];
  requestHandler: (qid: number, answer: number) => void;
}
export function PredictionQuestion({
  questionId,
  questionIndex,
  questionDescription,
  options,
  myAnswer,
  percentage,
  requestHandler,
}: PredictionQuestionProps) {
  const isAnswered = myAnswer !== null;

  // TODO: handleAnswer 실제 API로 교체
  const handleAnswer = (index: number) => {
    if (myAnswer === index) return;
    requestHandler(questionId, index);
  };

  const totalOptionNumber = options.length - 1;
  return (
    <QuestionWrapper>
      <Question>
        <h2>{questionIndex + 1}</h2>
        {questionDescription}
      </Question>
      <OptionForm method="POST">
        {options.map((option, index) => (
          <OptionButton
            key={`${questionIndex}-${index}`}
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              handleAnswer(index);
            }}
            $position={index === 0 ? 'left' : index === totalOptionNumber ? 'right' : 'center'}
            $isAnswered={isAnswered}
            $isMyAnswer={index === myAnswer}
          >
            {option}
            {isAnswered && (
              <Percentage>
                <span>{percentage[index]}</span>
                <span>%</span>
              </Percentage>
            )}
          </OptionButton>
        ))}
      </OptionForm>
    </QuestionWrapper>
  );
}

const QuestionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  font-family: Spoqa Han Sans Neo;
  color: #ffffffde;
  font-weight: 500;
  font-size: 18px;
  letter-spacing: -0.04em;
  line-height: 25.2px;

  & h2 {
    height: 25px;
    width: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 10px;
    color: #ffffff99;
  }
`;

const OptionForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 2px;
  width: 100%;
`;

const OptionButton = styled(motion.button)<{
  $position: 'left' | 'center' | 'right';
  $isAnswered: boolean;
  $isMyAnswer: boolean;
}>`
  flex: 1 0 0;
  height: 67px;

  color: #ffffff;
  font-size: ${({ $isAnswered }) => ($isAnswered ? '12px' : '16px')};
  font-weight: ${({ $isAnswered }) => ($isAnswered ? 500 : 700)};
  line-height: normal;
  letter-spacing: ${({ $isAnswered }) => ($isAnswered ? '-0.72px' : '-0.48px')};

  border-top-left-radius: ${({ $position }) => ($position === 'left' ? '10px' : '0')};
  border-bottom-left-radius: ${({ $position }) => ($position === 'left' ? '10px' : '0')};
  border-top-right-radius: ${({ $position }) => ($position === 'right' ? '10px' : '0')};
  border-bottom-right-radius: ${({ $position }) => ($position === 'right' ? '10px' : '0')};

  background: ${({ $position, $isAnswered, $isMyAnswer }) => {
    if ($isAnswered) {
      if ($isMyAnswer) {
        switch ($position) {
          case 'left':
            return 'linear-gradient(90deg, #F3233C 0%, rgba(243, 35, 60, 0.25) 100%);';
          case 'center':
            return 'linear-gradient(90deg, rgba(76, 14, 176, 0.60) -12.75%, #4C0EB0 38.63%, #4C0EB0 60.71%, rgba(76, 14, 176, 0.60) 113.73%);';
          case 'right':
            return 'var(--grad_blue2, linear-gradient(90deg, rgba(41, 72, 255, 0.25) 0%, #2948FF 100%));';
        }
      } else {
        return 'var(--Background-3, linear-gradient(0deg, rgba(255, 255, 255, 0.03)0%, rgba(255, 255, 255, 0.03)100%), #121212);';
      }
    }
    return 'var(--Background-14,linear-gradient(0deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.14) 100%),#121212);';
  }};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Percentage = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: flex-end;
  justify-content: center;
  font-weight: 700;

  font-family: 'Spoqa Han Sans Neo';

  & span:nth-child(1) {
    font-size: 30px;
    letter-spacing: -3px;
    -webkit-text-stroke: 1px white;
  }
  & span:nth-child(2) {
    height: 20px;
    letter-spacing: -0.72px;
    font-size: 12px;
  }
`;
