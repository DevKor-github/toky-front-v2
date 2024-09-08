import styled from 'styled-components';
import { Icon } from '@/libs/design-system/icons';
import { Right } from '@/libs/design-system/typo/Right';
import { Wrong } from '@/libs/design-system/typo/Wrong';
import { motion } from 'framer-motion';

export function ResultBadge({ type }: { type: boolean }) {
  return (
    <BadgeWrapper initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Icon.AttendanceQuizResultBadgeTopStroke />
      {type ? <Right /> : <Wrong />}
      <Icon.AttendanceQuizResultBadgeBottomStroke />
    </BadgeWrapper>
  );
}

const BadgeWrapper = styled(motion.div)`
  position: absolute;
  top: 50%;
  transform: translate3d(0, -50%, 0);
  display: flex;
  width: 250px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  background: linear-gradient(90deg, rgba(18, 18, 18, 0) 0%, #4e0097 40%, #4e0097 65%, rgba(18, 18, 18, 0) 100%);
  backdrop-filter: blur(5px);
`;

const BadgeText = styled.div`
  color: #fff;
  text-align: center;
  font-family: Challan;
  font-size: 50px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: -2px;
`;
