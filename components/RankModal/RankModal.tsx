'use client';
import { useEffect } from 'react';
import styled from 'styled-components';

import { Flex } from '@/libs/design-system/flex';
import { Icon } from '@/libs/design-system/icons';
import Backdrop from '../Backdrop';
import { useRankShare } from './useRankShare';
import RankCard from './RankCard';

interface ShareModalProps {
  isModalOpen: boolean;
  onClose: () => void;
}

export function RankModal({ isModalOpen = true, onClose }: ShareModalProps) {
  const { imgSrc, rankInfo, isFetchLoading, imageRef, shareRef, shareImage } = useRankShare();

  useEffect(() => {
    document.body.style.cssText = `overflow: hidden;`;
    return () => {
      document.body.style.cssText = `overflow: auto;`;
    };
  }, []);

  return (
    <>
      {isModalOpen && !isFetchLoading && rankInfo && imgSrc && (
        <Wrapper>
          <Content>
            <Flex $direction="column" $gap={0} $align="center" style={{ height: '100%' }}>
              <div ref={imageRef}>
                <RankCard ref={shareRef} src={imgSrc} rankInfo={rankInfo} />
              </div>
              <Flex $gap={10} $direction="column" $align="center" style={{ marginTop: -60 }}>
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
            </Flex>
          </Content>
          <Backdrop
            $isModalOpen={isModalOpen}
            onClick={onClose}
            $backgroundColor=" var(--Background-5,linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),#121212);"
            $backdropBlur={false}
          />
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

const ShareButtonWrapper = styled.div`
  position: absolute;
`;
