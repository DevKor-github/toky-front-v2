'use client';

import styled from 'styled-components';
import Header from '@/components/Header';
import { useGetTicketHistoryList } from '@/libs/apis/tickets';

export default function TicketHistory() {
  const { data: ticketHistoryList } = useGetTicketHistoryList() || [];

  return (
    <>
      <Header title="적립/사용내역" withSideBar={true} />
      <Wrapper>
        <TicketHistoryList>
          {ticketHistoryList?.map((ticketHistory) => (
            <TicketHistoryItem key={ticketHistory.id}>
              <TicketHistoryItemTitle>{ticketHistory.detail}</TicketHistoryItemTitle>
              <TicketHistoryItemDate>{ticketHistory.createdAt}</TicketHistoryItemDate>
              <TicketHistoryItemTicket>{ticketHistory.usedTicket}개 사용</TicketHistoryItemTicket>
              <TicketHistoryItemTicket>{ticketHistory.remainingTicket}개 남음</TicketHistoryItemTicket>
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
  padding: 16px 0;
  border-bottom: 1px solid var(--gray_2, #e5e5e5);
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

const TicketHistoryItemTicket = styled.div`
  font-size: 14px;
  color: var(--gray_6, #757575);
`;
