import Modal from '../Modal';

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export function EndModal({ isModalOpen = true, onClose }: ModalProps) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose} withBackdrop={true} backdropBlur={false}>
      응모가 종료되었습니다!
    </Modal>
  );
}
