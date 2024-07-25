'use client';
import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import PredictionCard from './PredictionCard';
import styled from 'styled-components';
import Backdrop from '../Backdrop';
import { useCardShare } from './useCardShare';
import { useRef } from 'react';

interface ShareModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isModalOpen = true, onClose }: ShareModalProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { downloadImage, shareImage } = useCardShare(ref);
  return (
    <>
      {isModalOpen && (
        <Wrapper>
          <Content>
            <Flex $direction="column" $gap={14} $align="center" style={{ height: '100%' }}>
              <PredictionCard ref={ref} nickname="jone" numWinKorea={0} numWinYonsei={2} predictionImgSrc="" />
              <Flex $gap={11} style={{ marginTop: 2 }}>
                <CancelButton onClick={onClose}>
                  <Icon.Cancel />
                </CancelButton>
                <ShareButton onClick={shareImage}>
                  <Icon.Share />
                  공유하기
                </ShareButton>
              </Flex>
              <ToolTip>
                @official.toky 태그하고 <br />
                공유 이벤트에 참여해보세요!
                <ToolTipArrow />
              </ToolTip>
            </Flex>
          </Content>
          <Backdrop $isModalOpen={isModalOpen} onClick={onClose} />
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.theme.zIndex.modal};
  background-color: ${({ theme }) => theme.colors.background};
`;

const Content = styled.div`
  position: relative;
  z-index: ${(props) => props.theme.zIndex.modal};
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  padding: 12px;
`;

const ShareButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  background: ${({ theme }) => theme.colors.white87};
  gap: 8px;
  padding: 12px 24px;

  color: ${({ theme }) => theme.colors.primary};
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.68px;
`;

const ToolTip = styled.div`
  position: relative;
  color: ${({ theme }) => theme.colors.white87};
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.52px;
  border-radius: 8px;
  text-align: center;
  background: ${({ theme }) => theme.colors.secondaryBackground};
  margin-left: 60px;
`;

const ToolTipArrow = styled.div`
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid ${({ theme }) => theme.colors.secondaryBackground};
`;