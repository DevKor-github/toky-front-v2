import ActionButton from '../ActionButton';
import styled from 'styled-components';
import { useState } from 'react';
import { Icon } from '@/libs/design-system/icons';

interface QuizButtonProps {
  type: boolean;
  onAnswer: (answer: boolean) => void;
}

export function QuizButton({ type, onAnswer }: QuizButtonProps) {
  const [bgColor, setBgColor] = useState(
    'var(--Background-14, linear-gradient(0deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.14) 100%), #121212)',
  );

  const onClickHandler = (type: boolean) => {
    onAnswer(type);
    setBgColor(type === true ? 'rgba(89, 136, 255, 0.80)' : 'rgba(249, 91, 110, 0.80)');
  };

  return (
    <ActionButton
      bgColor={bgColor}
      width="128px"
      height="128px"
      padding="29px"
      borderRadius="12px"
      onClick={() => onClickHandler(type)}
    >
      {type === true ? <Icon.OButton /> : <Icon.XButton />}
    </ActionButton>
  );
}
