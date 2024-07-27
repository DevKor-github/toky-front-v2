import styled from 'styled-components';
import Button from '../Button';
import React, { PropsWithChildren } from 'react';
import Backdrop from '../Backdrop';

interface ModalProps extends PropsWithChildren {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  withBackdrop?: boolean;
}
export function Modal({
  isModalOpen,
  onClose,
  onConfirm,
  confirmText = '확인',
  withBackdrop = true,
  children,
}: ModalProps) {
  const onClickConfirm = onConfirm || onClose;

  return (
    <div>
      {withBackdrop && <Backdrop $isModalOpen={isModalOpen} onClick={onClose} />}
      <ModalWrapper>
        <Content $isModalOpen={isModalOpen}>
          {children}
          <Button $type="primary" onClick={onClickConfirm}>
            {confirmText}
          </Button>
        </Content>
      </ModalWrapper>
    </div>
  );
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${({ theme }) => theme.zIndex.modal};
  max-width: 80%;
`;

const Content = styled.div<{ $isModalOpen: boolean }>`
  display: ${({ $isModalOpen }) => ($isModalOpen ? 'flex' : 'none')};
  width: 350px;
  max-width: 100%;
  padding: 64px 20px 24px 20px;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  border-radius: 16px;
  background: ${({ theme }) => theme.colors.black24};
  box-shadow: 0px 4px 10px 0px rgba(18, 18, 18, 0.15);
  gap: 48px;

  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.2px;
  color: white;
`;
