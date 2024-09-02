import { useState } from 'react';
import useTimer from './useTimer';
import styled from 'styled-components';
import { getFormattedTimeFromSeconds } from '@/libs/utils/time';

interface TimerProps {
  expiryTimestamp: Date;
}
export function Timer({ expiryTimestamp }: TimerProps) {
  const [isExpired, setIsExpired] = useState(false);
  const { totalSeconds } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsExpired(true);
    },
  });

  const { formatedDays, formatedHours, formatedMinutes, formatedSeconds } = getFormattedTimeFromSeconds(totalSeconds);
  const timer = `${formatedDays}일 ${formatedHours}시간 ${formatedMinutes}분 ${formatedSeconds}초`;
  return (
    <>
      {isExpired ? (
        // TODO 마감 컴포넌트
        <ExpiredWrapper>예측 마감</ExpiredWrapper>
      ) : (
        <TimerWrapper>
          <h5>예측 마감까지</h5>
          <h4>{timer}</h4>
        </TimerWrapper>
      )}
    </>
  );
}

const TimerWrapper = styled.div`
  white-space: nowrap;
  color: white;
  width: 220px;
  h5 {
    ${(prop) => prop.theme.typography.body2Regular}
  }
  h4 {
    ${(prop) => prop.theme.typography.headTextBold}
  }
`;

const ExpiredWrapper = styled.div`
  ${(prop) => prop.theme.typography.headTextBold};
  text-align: center;
  color: white;
`;
