'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import { Icon } from '@/libs/design-system/icons';
import { useIntersectionObserver, useWindowScroll } from '@uidotdev/usehooks';
import { useCallback, useEffect, useState } from 'react';
import { additionalData1, additionalData2, initialData } from './constant';
import RankList from './__components/rankList';
import MyRank from './__components/myRank';
import { useShareModal } from '@/components/ShareModal';

export default function Rank() {
  const { openShareModal } = useShareModal();

  const openModal = useCallback(async () => {
    await openShareModal();
  }, [openShareModal]);

  const [data, setData] = useState(initialData);
  const [hasMore, setHasMore] = useState(true);
  const currentUser = '토키파이팅';

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  });

  const isIntersecting = entry?.isIntersecting ?? false;

  useEffect(() => {
    if (isIntersecting) {
      loadMoreData();
    }
  }, [isIntersecting]);

  const loadMoreData = () => {
    if (hasMore) {
      setData((prevData) => [...prevData, ...additionalData1]);
      setHasMore(false); // Simulate no more data
    }
  };

  const [{ x, y }, scrollTo] = useWindowScroll();

  return (
    <>
      <Header title="적중률 랭킹" withSideBar={true} />
      <MyRank shareHandler={openModal} />
      <RankList data={data} currentUser={currentUser}>
        <div ref={ref} />
      </RankList>
      <ScrollToTopButton onClick={() => scrollTo({ left: 0, top: 0, behavior: 'smooth' })}>
        <Icon.VerticalAlignTop />
      </ScrollToTopButton>
    </>
  );
}

const ScrollToTopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 46px;
  height: 46px;
  border-radius: 99px;
  background: var(
    --Background-14,
    linear-gradient(0deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.14) 100%),
    #121212
  );
  box-shadow: 0px 4px 10px 0px rgba(18, 18, 18, 0.15);
`;
