import styled from 'styled-components';
import { useToast } from '@/components/Toast';

import { OptionButton } from '@/components/PredictionQuestion/OptionButton';

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
  const { openToast } = useToast();

  // TODO: handleAnswer 실제 API로 교체
  const handleAnswer = (index: number) => {
    if (myAnswer === null) {
      openToast({ message: '응모권 1장 획득!' });
    }
    requestHandler(questionIndex, index);
  };

  const totalOptionNumber = options.length - 1;

  return (
    <QuestionWrapper>
      <Question>
        <h2>{questionIndex + 1}</h2>
        {questionDescription}
      </Question>
      <OptionForm method="POST">
        {options.map((option, index) => {
          const position = index === 0 ? 'left' : index === totalOptionNumber ? 'right' : 'center';
          return (
            <OptionButton
              key={`${questionIndex}-${index}`}
              option={option}
              index={index}
              handleAnswer={handleAnswer}
              position={position}
              percentage={percentage[index]}
              myAnswer={myAnswer}
            />
          );
        })}
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
    margin: 3.5px 4px;
    width: 18px;
    height: 18px;
    border-radius: 6px;
    background: var(
      --Background-5,
      linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
      #121212
    );

    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 10px;
    color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
  }
`;

const OptionForm = styled.form`
  display: flex;
  justify-content: center;
  gap: 2px;
  width: 100%;
`;
