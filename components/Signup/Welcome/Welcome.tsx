import { motion, Transition } from 'framer-motion';
import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';
import Image from 'next/image';
import styled from 'styled-components';

const AnimatieTransition: Transition = {
  delay: 1,
  duration: 1,
};

interface WelcomeProps {
  curProgress: number;
  nickname: string;
}
export function Welcome({ curProgress, nickname }: WelcomeProps) {
  const startAnimation = curProgress === 4;

  return (
    <Wrapper>
      <Motion initial={{ opacity: 1 }} animate={{ opacity: startAnimation ? 0 : 1 }} transition={AnimatieTransition}>
        <StyledImage src="/image-proxy/welcome1.png" alt="welcome" fill />
      </Motion>
      <Motion initial={{ opacity: 0 }} animate={{ opacity: startAnimation ? 1 : 0 }} transition={AnimatieTransition}>
        <WelcomeMessage>
          환영합니다.
          <br />
          <Nickname>{nickname}</Nickname>님
        </WelcomeMessage>
        <StyledImage src="/image-proxy/welcome2.png" alt="welcome" fill />
      </Motion>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const Motion = styled(motion.div)`
  aspect-ratio: 390/731;
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const WelcomeMessage = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;

  color: var(--_60, rgba(255, 255, 255, 0.6));
  font-size: 18px;
  font-weight: 500;
  line-height: 140%;
  letter-spacing: -0.8px;
`;
const Nickname = styled.span`
  color: var(--white_0, #fff);
`;
