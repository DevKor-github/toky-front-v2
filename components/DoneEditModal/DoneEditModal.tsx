import Modal from '@/components/Modal';

interface DoneEditModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}
export function DoneEditModal({ isModalOpen = true, onClose }: DoneEditModalProps) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose} withBackdrop={true} backdropBlur={false}>
      수정이 완료되었습니다.
    </Modal>
  );
}
