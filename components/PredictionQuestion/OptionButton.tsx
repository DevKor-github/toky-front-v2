import { Icon } from '@/libs/design-system/icons';
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
  realAnswer: number | null;
}
export function OptionButton({
  index,
  handleAnswer,
  option,
  position,
  percentage,
  myAnswer,
  realAnswer,
}: OptionButtonProps) {
  const isAnswered = myAnswer !== null; // 내가 찍은 문제인지
  const isMyAnswer = myAnswer === index; // 내가 찍은 옵션인지
  const hasRealAnswer = realAnswer !== null; // 정답이 공개된 문제인지
  const isRealAnswer = realAnswer === index; // 이 옵션이 정답인지
  const isCorrect = isRealAnswer && isMyAnswer; // 내가 이 옵션으로 적중 했는지

  return (
    <Wrapper>
      {isCorrect && (
        <IconWrapper>
          <Icon.Hit />
        </IconWrapper>
      )}
      <ButtonWrapper
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          if (!hasRealAnswer) {
            if (index === myAnswer) return;
            handleAnswer(index);
          }
        }}
        $position={position}
        $isAnswered={isAnswered}
        $isMyAnswer={isMyAnswer}
      >
        {!isCorrect && (
          <>
            {option}
            {isAnswered && (
              <Percentage $isMyAnswer={isMyAnswer}>
                <span>{percentage}</span>
                <span>%</span>
              </Percentage>
            )}
          </>
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
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  flex: 1 0 0;
`;

const ButtonWrapper = styled.button<{
  $position: 'left' | 'center' | 'right';
  $isAnswered: boolean;
  $isMyAnswer: boolean;
}>`
  width: 100%;
  height: 67px;
  position: relative;
  overflow: hidden;
  z-index: 0;

  color: ${({ $isMyAnswer }) => ($isMyAnswer ? `var(--white_0, #FFF)` : `#3C3C3C`)};
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

const Percentage = styled.div<{ $isMyAnswer: boolean }>`
  display: flex;
  gap: 0.3rem;
  align-items: flex-end;
  justify-content: center;
  font-weight: 700;

  font-family: 'Spoqa Han Sans Neo';
  color: ${({ $isMyAnswer }) => ($isMyAnswer ? `var(--white_0, #FFF)` : `#3C3C3C`)};

  & span:nth-child(1) {
    font-size: 30px;
    letter-spacing: -3px;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: ${({ $isMyAnswer }) => ($isMyAnswer ? `var(--white_0, #FFF)` : `#3C3C3C`)};
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

const IconWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;
