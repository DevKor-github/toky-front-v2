'use client';
import { useOverlay } from '@/libs/design-system/overlay';
import { LoginModal } from './LoginModal';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';

export function useLoginModal() {
  const overlay = useOverlay();
  const isLogin = useAuthStore((state) => state.isLogin);
  const openLoginModal = () => {
    if (!isLogin) {
      return new Promise<boolean>((resolve) => {
        overlay.open(({ isOpen, exit }) => <LoginModal isModalOpen={isOpen} onClose={exit} />);
      });
    }
  };

  return { openLoginModal };
}
