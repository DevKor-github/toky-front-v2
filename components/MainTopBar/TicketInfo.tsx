import { Icon } from '@/libs/design-system/icons';
import { useTicketStore } from '@/libs/store/Providers/TicketStoreProvider';
import styled from 'styled-components';
import Link from 'next/link';

export function TicketInfo() {
  const tickets = useTicketStore((state) => state.tickets);

  return (
    <Link href="/ticket-history">
      <Wrapper>
        <Icon.Ticket size={20} />
        {tickets}장
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 2px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 99px;
  background: rgba(255, 233, 64, 0.1);
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
