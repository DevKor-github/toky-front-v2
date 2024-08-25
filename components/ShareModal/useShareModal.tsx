'use client';
import { useOverlay } from '@/libs/design-system/overlay';
import { ShareModal } from './ShareModal';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { useLoginModal } from '../LoginModal/useLoginModal';

export function useShareModal() {
  const overlay = useOverlay();
  const { isLogin } = useAuthStore();
  const { openLoginModal } = useLoginModal();
  const openShareModal = () => {
    if (!isLogin) {
      openLoginModal();
      return new Promise<boolean>((resolve) => resolve(false));
    }
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, exit }) => <ShareModal isModalOpen={isOpen} onClose={exit} />);
    });
  };

  return { openShareModal };
}
