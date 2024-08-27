import styled from 'styled-components';
import { motion } from 'framer-motion';

import { useSignupForm } from '@/app/signup/store';
import { SchoolType } from '@/app/signup/constants';

const motionVariant = { visible: { opacity: 1 }, hidden: { opacity: 0 } };

interface UnivButtonProps {
  school: Exclude<SchoolType, null>;
}
export function UnivButton({ school }: UnivButtonProps) {
  const selectedSchool = useSignupForm((state) => state.school);
  const setSchool = useSignupForm((state) => state.setSchool);

  const selected = selectedSchool === school;
  return (
    <Button $selected={selected} onClick={() => setSchool(school)}>
      {school === 'korea' ? '고려대학교' : '연세대학교'}
      <Gradient $type={school} variants={motionVariant} initial={'hidden'} animate={selected ? 'visible' : 'hidden'} />
      <InitialBG />
    </Button>
  );
}

const Button = styled.button<{ $selected: boolean }>`
  width: 128px;
  height: 128px;
  border-radius: 100%;
  position: relative;
  overflow: hidden;

  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-size: 18px;
  letter-spacing: -0.72px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};

  transition: all 0.2s;
`;

const InitialBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -2;

  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );
`;
const Gradient = styled(motion.div)<{ $type: Exclude<SchoolType, null> }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;

  background: ${({ $type }) => {
    switch ($type) {
      case 'korea':
        return `var(--grad_red, linear-gradient(90deg, #F3233C 0%, #F95B6E 100%))`;
      case 'yonsei':
        return `var(--grad_blue, linear-gradient(90deg, #5B84FF 0%, #2948FF 100%))`;
    }
  }};
`;
