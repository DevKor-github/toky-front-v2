'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import { useGetTicketHistoryList } from '@/libs/apis/tickets';
import { Flex } from '@/libs/design-system/flex';
import { useEffect } from 'react';
import { useLoginModal } from '@/components/LoginModal/useLoginModal';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';

export default function TicketHistory() {
  const { openLoginModal } = useLoginModal();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { data: ticketHistoryList, refetch: refetchTicketHistoryList } = useGetTicketHistoryList() || [];

  useEffect(() => {
    if (!isLogin) {
      openLoginModal();
    }
    refetchTicketHistoryList();
  });

  const dataFormat = (dateString: string) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{3}Z$/;
    const match = dateString.match(regex);

    if (match) {
      const year = match[1].slice(-2); // 연도의 마지막 두 자리
      const month = match[2];
      const day = match[3];
      const hours = match[4];
      const minutes = match[5];

      return `${year}.${month}.${day} ${hours}:${minutes}`;
    }
  };

  const usedTicketFormat = (usedTicket: number) => {
    if (usedTicket < 0) {
      return `${usedTicket}`;
    }
    return `+${usedTicket}`;
  };

  return (
    <>
      <Header title="적립/사용내역" withSideBar={true} />
      <Wrapper>
        <TicketHistoryList>
          {ticketHistoryList?.map((ticketHistory) => (
            <TicketHistoryItem key={ticketHistory.id}>
              <Flex $justify="space-between">
                <Flex $direction="column">
                  <TicketHistoryItemTitle>{ticketHistory.detail}</TicketHistoryItemTitle>
                  <TicketHistoryItemDate>{dataFormat(ticketHistory.createdAt)}</TicketHistoryItemDate>
                </Flex>
                <Flex $direction="column" $align="flex-end">
                  <TicketHistoryItemUsedTicket>
                    {usedTicketFormat(ticketHistory.usedTicket)}장
                  </TicketHistoryItemUsedTicket>
                  <TicketHistoryItemRemainingTicket>{ticketHistory.remainingTicket}장</TicketHistoryItemRemainingTicket>
                </Flex>
              </Flex>
            </TicketHistoryItem>
          ))}
        </TicketHistoryList>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.navigationBarHeight}px;
  position: relative;
`;

const TicketHistoryList = styled.div`
  padding: 0 16px;
`;

const TicketHistoryItem = styled.div`
  padding: 25px 0px 15px 0px;
  border-bottom: 0.5px solid var(--_15, rgba(255, 255, 255, 0.15));
`;

const TicketHistoryItemTitle = styled.div`
  color: white;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 8px;
`;

const TicketHistoryItemDate = styled.div`
  font-size: 14px;
  color: var(--gray_6, #757575);
  margin-bottom: 8px;
`;

const TicketHistoryItemUsedTicket = styled.div`
  color: var(--white_0, #fff);
  text-align: right;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 17px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const TicketHistoryItemRemainingTicket = styled.div`
  color: var(--_38, rgba(255, 255, 255, 0.38));
  text-align: right;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 11px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
