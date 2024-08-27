import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../client/client';
import { useTicketStore } from '../store/Providers/TicketStoreProvider';

const getTickets = async () => {
  const response = await client.get<number>('/ticket');
  return response.data;
};

interface DrawGift {
  count: number;
  giftId: number;
}

const postTicketsDraw = async (draws: DrawGift[]) => {
  const response = await client.post('/ticket', {
    draws,
  });
  return response;
};

// 현재는 응모권 하나씩, 한 상품에만 응모 가능
const drawOneGift = async (giftId: number) => {
  const tickets = useTicketStore((state) => state.tickets);
  if (tickets < 1) {
    throw new Error('응모권이 부족합니다.');
  }
  return postTicketsDraw([{ count: 1, giftId }]);
};

export const useGetTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
    enabled: false,
  });
};

const useDrawOneGift = () => {
  const decreaseTickets = useTicketStore((state) => state.decreaseTickets);

  return useMutation({
    mutationFn: drawOneGift,
    onSuccess: () => {
      decreaseTickets(1);
    },
    // TODO 에러 처리
  });
};

export const useDraw = () => {
  const setTickets = useTicketStore((state) => state.setTickets);
};
