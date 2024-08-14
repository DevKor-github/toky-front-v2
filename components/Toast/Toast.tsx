import { ANIMATION_DURATION } from '@/components/Toast/constant';
import { motion } from 'framer-motion';
import { duration } from 'html2canvas/dist/types/css/property-descriptors/duration';
import styled from 'styled-components';

interface ToastProps {
  isOpen: boolean;
  message: string;
}
export function Toast({ isOpen, message }: ToastProps) {
  return (
    <ToastLayout>
      <ToastContainer
        initial={{ opacity: 0, translateY: 66 }}
        animate={isOpen ? { opacity: 1, translateY: 0 } : { opacity: 0, translateY: 66 }}
        transition={{ duration: ANIMATION_DURATION / 1000, type: 'spring' }}
      >
        {message}
      </ToastContainer>
    </ToastLayout>
  );
}

const ToastLayout = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  width: 100vw;
  display: flex;
  justify-content: center;

  z-index: ${({ theme }) => theme.zIndex.toast};
`;

const ToastContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  width: fit-content;
  height: 46px;
  border-radius: 9999px;
  padding: 13px 31px;

  background: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));

  font-family: 'Spoqa Han Sans Neo';
  color: var(--Background-0, #121212);
  font-size: 16px;
  letter-spacing: -0.64px;
`;
