import Modal from '../Modal';

interface LoginModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isModalOpen = true, onClose }: LoginModalProps) {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose} withBackdrop={true} backdropBlur={false}>
      로그인 후 이용가능한 <br /> 서비스입니다.
    </Modal>
  );
}
