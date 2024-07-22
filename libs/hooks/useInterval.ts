import { useEffect } from 'react';
import { usePreservedCallback } from './usePreservedCallback';
import { noop } from '../utils/noop';

type IntervalOptions =
  | number
  | {
      delay: number | null;
      trailing?: boolean;
      enabled?: boolean;
    };

const getEnabled = (options: IntervalOptions) => {
  if (typeof options === 'number' || options.enabled === undefined) return true;
  return options.enabled;
};

export function useInterval(callback: () => void, options: IntervalOptions) {
  const delay = typeof options === 'number' ? options : options.delay;
  const trailing = typeof options === 'number' ? undefined : options.trailing;
  const enabled = getEnabled(options);

  const savedCallback = usePreservedCallback(callback ?? noop);

  useEffect(() => {
    if (trailing === false && enabled) {
      savedCallback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trailing, savedCallback]);

  useEffect(() => {
    if (delay === null || !enabled) {
      return () => {
        return;
      };
    }

    const id = window.setInterval(savedCallback, delay);
    return () => window.clearInterval(id);
  }, [delay, savedCallback, enabled]);
}
