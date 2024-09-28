'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import { Icon } from '@/libs/design-system/icons';
import { useIntersectionObserver, useWindowScroll } from '@uidotdev/usehooks';
import { useCallback, useEffect } from 'react';
import { useGetRankInfiniteScroll, useGetMyRank } from '@/libs/apis/rank';
import RankList from './__components/rankList';
import MyRank from './__components/myRank';
import { useRankModal } from '@/components/RankModal/useRankModal';

export default function Rank() {
  const { data: myRank } = useGetMyRank();

  const { data, fetchNextPage, isFetchingNextPage } = useGetRankInfiniteScroll(15, 'rank');

  const { openRankModal } = useRankModal();

  const openModal = useCallback(async () => {
    await openRankModal();
  }, [openRankModal]);

  const currentUser = myRank?.name ?? '';

  const [ref, entry] = useIntersectionObserver({
    threshold: 0,
    root: null,
    rootMargin: '0px',
  });

  const isIntersecting = entry?.isIntersecting ?? false;

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage]);

  const [{ x, y }, scrollTo] = useWindowScroll();

  const rankItems = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <>
      <Header title="적중률 랭킹" withSideBar={true} />
      <MyRank shareHandler={openModal} myRank={myRank} />
      <RankList data={rankItems} currentUser={currentUser}>
        {!isFetchingNextPage && <InfiniteFetchDiv ref={ref} />}
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

const InfiniteFetchDiv = styled.div`
  height: 5px;
`;
