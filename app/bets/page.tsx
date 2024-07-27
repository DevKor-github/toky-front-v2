'use client';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useShareModal } from '@/components/ShareModal';
import styled from 'styled-components';

export default function Bets() {
  const { openShareModal } = useShareModal();
  async function openModal() {
    await openShareModal();
  }

  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <button style={{ color: 'white', fontSize: '20px' }} onClick={openModal}>
          공유
        </button>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
`;
