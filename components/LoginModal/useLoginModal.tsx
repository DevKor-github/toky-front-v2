'use client';
import { useOverlay } from '@/libs/design-system/overlay';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { LoginModal } from './LoginModal';

export function useLoginModal() {
  const overlay = useOverlay();
  const { isLogin } = useAuthStore();
  const openLoginModal = () => {
    if (!isLogin) {
      return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, exit }) => <LoginModal isModalOpen={isOpen} onClose={exit} />);
      });
    }
  };

  return { openLoginModal };
}
