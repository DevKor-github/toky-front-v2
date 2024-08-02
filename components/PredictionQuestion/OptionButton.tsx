import { motion } from 'framer-motion';
import styled from 'styled-components';

const motionVariant = { visible: { opacity: 1 }, hidden: { opacity: 0 } };
interface OptionButtonProps {
  index: number;
  handleAnswer: (index: number) => void;
  option: string;
  position: 'left' | 'center' | 'right';
  percentage: number;
  myAnswer: number | null;
}
export function OptionButton({ index, handleAnswer, option, position, percentage, myAnswer }: OptionButtonProps) {
  const isAnswered = myAnswer !== null;
  const isMyAnswer = myAnswer === index;

  return (
    <Wrapper
      type="submit"
      onClick={(e) => {
        e.preventDefault();
        handleAnswer(index);
      }}
      $isAnswered={isAnswered}
      $position={position}
    >
      {option}
      {isAnswered && (
        <Percentage>
          <span>{percentage}</span>
          <span>%</span>
        </Percentage>
      )}
      {/* default gradient */}
      <Gradient
        initial={'visible'}
        variants={motionVariant}
        animate={isAnswered ? 'hidden' : 'visible'}
        $type={'default'}
        $position={position}
      />
      {/* selected gradient */}
      <Gradient
        initial={'hidden'}
        variants={motionVariant}
        animate={isMyAnswer ? 'visible' : 'hidden'}
        $type={'selected'}
        $position={position}
      />
      {/* nonselected gradient */}
      <Gradient
        initial={'hidden'}
        variants={motionVariant}
        animate={isMyAnswer ? 'hidden' : 'visible'}
        $type={'nonselected'}
        $position={position}
      />
    </Wrapper>
  );
}

const Wrapper = styled.button<{
  $position: 'left' | 'center' | 'right';
  $isAnswered: boolean;
}>`
  flex: 1 0 0;
  height: 67px;
  position: relative;
  overflow: hidden;
  z-index: 0;

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

const Gradient = styled(motion.div)<{
  $position: 'left' | 'center' | 'right';
  $type: 'default' | 'selected' | 'nonselected';
}>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  background: ${({ $position, $type }) => {
    switch ($type) {
      case 'default':
        return 'linear-gradient(0deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.14) 100%)';
      case 'nonselected':
        return 'linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%)';
      case 'selected':
        switch ($position) {
          case 'left':
            return 'linear-gradient(90deg, #F3233C 0%, rgba(243, 35, 60, 0.25) 100%)';
          case 'center':
            return 'linear-gradient(90deg, rgba(76, 14, 176, 0.60) -12.75%, #4C0EB0 38.63%, #4C0EB0 60.71%, rgba(76, 14, 176, 0.60) 113.73%)';
          case 'right':
            return 'linear-gradient(90deg, rgba(41, 72, 255, 0.25) 0%, #2948FF 100%)';
        }
    }
  }};
`;
