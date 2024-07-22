import { useInterval } from '@/libs/hooks/useInterval';
import {
  checkValidateExpiryTimestamp,
  checkValidOnExpire,
  getSecondsFromExpiry,
  getTimeFromSeconds,
} from '@/libs/utils/time';
import { useState, useCallback } from 'react';

const DEFAULT_DELAY = 1000;

function getDelayFromExpiryTimestamp(expiryTimestamp: Date) {
  if (!checkValidateExpiryTimestamp(expiryTimestamp)) {
    return null;
  }

  const seconds = getSecondsFromExpiry(expiryTimestamp);
  const extraMilliSeconds = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return extraMilliSeconds > 0 ? extraMilliSeconds : DEFAULT_DELAY;
}

interface useTimerProps {
  expiryTimestamp: Date;
  onExpire?: () => void;
  autoStart?: boolean;
}

export default function useTimer({ expiryTimestamp: expiry, onExpire, autoStart = true }: useTimerProps) {
  const [expiryTimestamp, setExpiryTimestamp] = useState(expiry);
  const [seconds, setSeconds] = useState(getSecondsFromExpiry(expiryTimestamp));
  const [isRunning, setIsRunning] = useState(autoStart);
  const [didStart, setDidStart] = useState(autoStart);
  const [delay, setDelay] = useState(getDelayFromExpiryTimestamp(expiryTimestamp));

  const handleExpire = useCallback(() => {
    checkValidOnExpire(onExpire) && onExpire?.();
    setIsRunning(false);
    setDelay(null);
  }, [onExpire]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const restart = useCallback((newExpiryTimestamp: Date, newAutoStart = true) => {
    setDelay(getDelayFromExpiryTimestamp(newExpiryTimestamp));
    setDidStart(newAutoStart);
    setIsRunning(newAutoStart);
    setExpiryTimestamp(newExpiryTimestamp);
    setSeconds(getSecondsFromExpiry(newExpiryTimestamp));
  }, []);

  const resume = useCallback(() => {
    const time = new Date();
    time.setMilliseconds(time.getMilliseconds() + seconds * 1000);
    restart(time);
  }, [seconds, restart]);

  const start = useCallback(() => {
    if (didStart) {
      setSeconds(getSecondsFromExpiry(expiryTimestamp));
      setIsRunning(true);
    } else {
      resume();
    }
  }, [expiryTimestamp, didStart, resume]);

  useInterval(
    () => {
      if (delay !== DEFAULT_DELAY) {
        setDelay(DEFAULT_DELAY);
      }
      const secondsValue = getSecondsFromExpiry(expiryTimestamp);
      setSeconds(secondsValue);
      if (secondsValue <= 0) {
        handleExpire();
      }
    },
    {
      delay: isRunning ? delay : null,
    },
  );

  return {
    ...getTimeFromSeconds(seconds),
    start,
    pause,
    resume,
    restart,
    isRunning,
  };
}
