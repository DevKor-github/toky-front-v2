'use client';
import { useOverlay } from '@/libs/design-system/overlay';
import { ShareModal } from './ShareModal';

export function useShareModal() {
  const overlay = useOverlay();
  const openShareModal = () => {
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, exit }) => <ShareModal isModalOpen={isOpen} onClose={exit} />);
    });
  };

  return { openShareModal };
}
