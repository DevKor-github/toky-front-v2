'use client';

import { useOverlay } from '@/libs/design-system/overlay';
import { DoneEditModal } from '@/components/DoneEditModal/DoneEditModal';

export function useDoneEditModal() {
  const overlay = useOverlay();
  const openDoneEditModal = () => {
    return new Promise<boolean>(() => {
      overlay.open(({ isOpen, exit }) => <DoneEditModal isModalOpen={isOpen} onClose={exit} />);
    });
  };
  return { openDoneEditModal };
}
