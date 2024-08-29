import styled from 'styled-components';
import { motion } from 'framer-motion';

interface SignupProgressProps {
  curProgress: number;
  totalProgress: number;
}
export function SignupProgress({ curProgress, totalProgress }: SignupProgressProps) {
  return (
    <ProgressBarWrapper>
      <ProgressBar initial={{ scaleX: 0 }} animate={{ scaleX: curProgress / totalProgress }} />
    </ProgressBarWrapper>
  );
}

const ProgressBarWrapper = styled.div`
  position: fixed;
  top: ${({ theme }) => theme.space.signupTopBarHeight}px;

  height: ${({ theme }) => theme.space.signupStatusBarHeight}px;
  width: 100%;
  background: var(--white-15, rgba(255, 255, 255, 0.15));
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  left: 0;
  transform-origin: 0%;

  height: 100%;
  width: 100%;
  background: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
`;
