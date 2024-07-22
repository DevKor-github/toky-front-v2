function getTimeFromSeconds(secs: number) {
  const totalSeconds = Math.ceil(secs);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
  };
}

function getSecondsFromExpiry(expiry: Date, shouldRound?: boolean) {
  const now = new Date().getTime();
  const milliSecondsDistance = expiry.getTime() - now;
  if (milliSecondsDistance > 0) {
    const val = milliSecondsDistance / 1000;
    return shouldRound ? Math.round(val) : val;
  }
  return 0;
}

function getSecondsFromPrevTime(prevTime: Date, shouldRound: boolean) {
  const now = new Date().getTime();
  const milliSecondsDistance = now - prevTime.getTime();
  if (milliSecondsDistance > 0) {
    const val = milliSecondsDistance / 1000;
    return shouldRound ? Math.round(val) : val;
  }
  return 0;
}

function getSecondsFromTimeNow() {
  const now = new Date();
  const currentTimestamp = now.getTime();
  const offset = now.getTimezoneOffset() * 60;
  return currentTimestamp / 1000 - offset;
}

function getFormattedTimeFromSeconds(totalSeconds: number) {
  const { seconds, minutes, hours, days } = getTimeFromSeconds(totalSeconds);
  const formatedDays = String(days).padStart(2, '0');
  const formatedHours = String(hours).padStart(2, '0');
  const formatedMinutes = String(minutes).padStart(2, '0');
  const formatedSeconds = String(seconds).padStart(2, '0');
  return {
    formatedDays,
    formatedHours,
    formatedMinutes,
    formatedSeconds,
  };
}

function checkValidateExpiryTimestamp(expiryTimestamp: Date) {
  const isValid = new Date(expiryTimestamp).getTime() > 0;
  if (!isValid) {
    console.error('expiryTimestamp should be a valid date');
  }
  return isValid;
}

function checkValidOnExpire(onExpire: (() => void) | undefined) {
  const isValid = onExpire && typeof onExpire === 'function';
  if (onExpire && !isValid) {
    console.error('onExpire should be a function');
  }
  return isValid;
}

export {
  getTimeFromSeconds,
  getSecondsFromExpiry,
  getSecondsFromPrevTime,
  getSecondsFromTimeNow,
  getFormattedTimeFromSeconds,
  checkValidateExpiryTimestamp,
  checkValidOnExpire,
};
