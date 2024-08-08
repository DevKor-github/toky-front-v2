import { useCallback, useRef } from 'react';
import { useOverlay } from '@/libs/design-system/overlay';

import { Toast } from '@/components/Toast/Toast';
import { ANIMATION_DURATION, DISPLAY_DURATION } from '@/components/Toast/constant';

interface OpenToastOption {
  message: string;
}
export function useToast() {
  const overlay = useOverlay();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exitTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const initTimeout = useCallback(() => {
    // 각종 타이머들을 초기화 합니다
    if (closeTimeoutRef.current !== null) {
      clearTimeout(closeTimeoutRef.current);
    }

    if (exitTimeoutRef.current !== null) {
      clearTimeout(exitTimeoutRef.current);
    }
  }, []);

  const handleClose = useCallback(() => {
    overlay.close();
    exitTimeoutRef.current = setTimeout(overlay.exit, ANIMATION_DURATION);
  }, [overlay]);

  const openToast = ({ message }: OpenToastOption) => {
    initTimeout();
    closeTimeoutRef.current = setTimeout(handleClose, DISPLAY_DURATION);
    overlay.open(({ isOpen }) => <Toast isOpen={isOpen} message={message} />);
  };

  return { openToast };
}
