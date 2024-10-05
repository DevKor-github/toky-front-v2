'use client';
import Image from 'next/image';
import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { Icon } from '@/libs/design-system/icons';
import { useToast } from '../Toast';
import { useDrawOneGift } from '@/libs/apis/tickets';
import { useLoginModal } from '../LoginModal/useLoginModal';
import { useNeedTicketModal } from '../NeedTicketModal/useNeedTicketModal';
import { sendGAEvent } from '@next/third-parties/google';
import { useEndModal } from '@/components/useEndModal/useEndModal';

interface DrawCardProps {
  totalDraw: number;
  productName: string;
  productAlias?: string;
  id: number;
  canDraw: boolean;
  imgUrl: string;
  isDone: boolean;
}

export function DrawCard({ totalDraw, productName, productAlias, id, canDraw, imgUrl, isDone = false }: DrawCardProps) {
  const [isClicked, setIsClicked] = useState(false);
  const { openToast } = useToast();
  const { openLoginModal } = useLoginModal();
  const { openNeedTikcetModal } = useNeedTicketModal();
  const { openEndModal } = useEndModal();
  const ticketControls = useAnimation();

  async function ticketAnimation() {
    await ticketControls.start({
      y: -34,
      opacity: 0,
      transition: { duration: 0.3 },
    });
    await ticketControls.set({ y: 0 });
    await ticketControls.start({
      opacity: 1,
      transition: { duration: 0.3 },
    });
  }

  function drawSuccess() {
    openToast({ message: `${productAlias ?? productName} 응모 완료!` });
    sendGAEvent('event', 'draw', {
      productName,
      totalDraw,
    });
    setTimeout(() => {
      setIsClicked(false);
    }, 400);
  }
  const { mutate: onDraw } = useDrawOneGift(drawSuccess, id);

  const handleClick = async () => {
    if (isDone) {
      openEndModal();
      return;
    }
    if (openLoginModal() !== false) return;
    if (!canDraw) {
      openNeedTikcetModal();
      return;
    }
    setIsClicked(true);
    ticketAnimation();
    onDraw(id);
  };

  return (
    <Wrapper>
      <ProductImage width={169} height={172} src={imgUrl} alt="draw-card" />
      <DrawBoard>
        현재&nbsp;<span>{totalDraw}장</span>&nbsp;응모
      </DrawBoard>
      <ProductName>{productName}</ProductName>
      <DrawButton
        onClick={handleClick}
        initial={{ width: '100%' }}
        animate={{ width: isClicked ? '93%' : '100%' }}
        transition={{ duration: 0.2 }}
        isDone={isDone}
      >
        <AnimatePresence>
          {isClicked && (
            <Wave
              initial={{ width: '100%', height: 46, opacity: 1 }}
              animate={{ width: '113%', height: 66, opacity: 0 }}
              transition={{ duration: 0.2, opacity: { duration: 0.2, delay: 0.1 } }}
            />
          )}
        </AnimatePresence>
        <TicketIconWrapper initial={{ y: 0, opacity: 1 }} animate={ticketControls}>
          <Icon.Ticket size={22} />
        </TicketIconWrapper>
        1장 응모
      </DrawButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 48%;
  height: 228px;
  padding: 30px 10px 10px 10px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  border-radius: 10px;
  background: ${({ theme }) => theme.colors.white60};
`;

const ProductImage = styled(Image)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  max-width: 100%;
`;

const DrawBoard = styled.div`
  position: absolute;
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.colors.white87};
  white-space: nowrap;
  border-radius: 8px;

  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.52px;
  & span {
    font-weight: 500;
  }

  &::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='5' viewBox='0 0 12 5' fill='none'%3E%3Cpath d='M8.12132 3.87868L12 0L5.24537e-07 -1.04907e-06L3.87868 3.87868C5.05025 5.05025 6.94975 5.05025 8.12132 3.87868Z' fill='white' fill-opacity='0.87'/%3E%3C/svg%3E");
    position: absolute;
    width: 12px;
    height: 6px;
    top: 24.5px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ProductName = styled.h5`
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.72px;
  text-align: center;
  white-space: pre-line;
  z-index: 1;
`;

const DrawButton = styled(motion.button)<{ isDone: boolean }>`
  display: flex;
  height: 46px;
  padding: 12px 0px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white87};

  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: -0.64px;
  position: relative;

  opacity: ${({ isDone }) => (isDone ? 0.7 : 1)};
`;

const TicketIconWrapper = styled(motion.div)`
  & svg {
    display: block;
  }
`;

const Wave = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  background: var(--white-disabled-38, rgba(255, 255, 255, 0.38));
  border-radius: 10px;
  width: 100%;
  height: 46px;
`;
