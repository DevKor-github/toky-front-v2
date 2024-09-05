'use client';
import { useOverlay } from '@/libs/design-system/overlay';
import { NeedTicketModal } from './NeedTicketModal';

export function useNeedTicketModal() {
  const overlay = useOverlay();
  const openNeedTikcetModal = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, exit }) => <NeedTicketModal isModalOpen={isOpen} onClose={exit} />);
    });
  };

  return { openNeedTikcetModal };
}
