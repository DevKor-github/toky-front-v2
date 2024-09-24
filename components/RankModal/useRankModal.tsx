'use client';
import { useOverlay } from '@/libs/design-system/overlay';
import { useLoginModal } from '../LoginModal/useLoginModal';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';
import { RankModal } from './RankModal';

export function useRankModal() {
  const overlay = useOverlay();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { openLoginModal } = useLoginModal();

  const openShareModal = () => {
    if (!isLogin) {
      openLoginModal();
      return new Promise<boolean>((resolve) => resolve(false));
    }
    return new Promise<boolean>((resolve) => {
      overlay.open(({ isOpen, exit }) => <RankModal isModalOpen={isOpen} onClose={exit} />);
    });
  };

  return { openShareModal };
}
