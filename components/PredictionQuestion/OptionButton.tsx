import { useMotionGradient } from '@/libs/hooks/useMotionGradient';
import { motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';

interface OptionButtonProps {
  index: number;
  handleAnswer: (index: number) => void;
  option: string;
  position: 'left' | 'center' | 'right';
  percentage: number;
  myAnswer: number | null;
}
export function OptionButton({ index, handleAnswer, option, position, percentage, myAnswer }: OptionButtonProps) {
  const { triggerAnimation, background } = useMotionGradient(position);

  useEffect(() => {
    const status = myAnswer === null ? 0 : myAnswer === index ? 1 : -1;
    triggerAnimation(status);
  }, [myAnswer, index, triggerAnimation]);

  return (
    <Wrapper
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        handleAnswer(index);
      }}
      style={{ background }}
      $isAnswered={myAnswer !== null}
      $position={position}
    >
      {option}
      {myAnswer !== null && (
        <Percentage>
          <span>{percentage}</span>
          <span>%</span>
        </Percentage>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(motion.button)<{
  $position: 'left' | 'center' | 'right';
  $isAnswered: boolean;
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
