import styled from 'styled-components';
import { Icon } from '@/libs/design-system/icons';

interface QuizInstructionInfo {
  description: string;
  image: JSX.Element;
}

export function AttendancePolicy() {
  const quizInstructions: QuizInstructionInfo[] = [
    { description: '출석퀴즈 메뉴에서\n1일1회 OX퀴즈 풀기', image: <Icon.AttendancePolicyOX /> },
    { description: '맞추면 2장, 틀려도 1장\n응모권 즉시 지급', image: <Icon.AttendancePolicyTickets /> },
    { description: '경품응모 메뉴에서\n원하는 경품에 응모하기', image: <Icon.AttendancePolicyGift /> },
  ];

  const startDate = '2024.09.09 (월)';
  const endDate = '2024.09.28 (토)';

  return (
    <Wrapper>
      <ParticipationPeriodWrapper>
        <ParticipationPeriodTitle>참여 기간</ParticipationPeriodTitle>
        <ParticipationPeriodContent>
          {startDate} - {endDate}
        </ParticipationPeriodContent>
      </ParticipationPeriodWrapper>
      <QuizInstructionWrapper>
        <QuizInstructionTitle>참여 방법</QuizInstructionTitle>
        {quizInstructions.map((quizInstruction, index) => (
          <QuizInstruction key={index}>
            <QuizInstructionLeft>
              <QuizInstructionIndex>{index + 1}</QuizInstructionIndex>
              <QuizInstructionDescription>{quizInstruction.description}</QuizInstructionDescription>
            </QuizInstructionLeft>
            <QuizInstructionImageWrapper>{quizInstruction.image}</QuizInstructionImageWrapper>
          </QuizInstruction>
        ))}
      </QuizInstructionWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 32px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ParticipationPeriodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const ParticipationPeriodTitle = styled.div`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 16px;
  font-style: normal;
  font-weight: 800;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.64px;
`;

const ParticipationPeriodContent = styled.div`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.6px;
`;

const QuizInstructionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const QuizInstruction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuizInstructionLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const QuizInstructionIndex = styled.div`
  margin-top: 4px;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 12px;
  font-weight: 700;
`;

const QuizInstructionTitle = styled.div`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 16px;
  font-weight: 800;
  line-height: 160%; /* 25.6px */
  letter-spacing: -0.64px;
`;

const QuizInstructionImageWrapper = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const QuizInstructionDescription = styled.div`
  white-space: pre-line;
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 160%; /* 24px */
  letter-spacing: -0.6px;
`;
