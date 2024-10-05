'use client';
import { useOverlay } from '@/libs/design-system/overlay';
import { EndModal } from './EndModal';

export function useEndModal() {
  const overlay = useOverlay();
  const openEndModal = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, exit }) => <EndModal isModalOpen={isOpen} onClose={exit} />);
    });
  };

  return { openEndModal };
}
