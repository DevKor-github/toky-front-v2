import Modal from '../Modal';

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export function NeedTicketModal({ isModalOpen = true, onClose }: ModalProps) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose} withBackdrop={true} backdropBlur={false}>
      응모권이 부족합니다.
    </Modal>
  );
}
