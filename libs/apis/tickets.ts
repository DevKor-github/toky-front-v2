import { useMutation, useQuery } from '@tanstack/react-query';
import client from '../client/client';
import { useTicketStore } from '../store/useTicketStore';
import { useEffect } from 'react';

const getTickets = async () => {
  const response = await client.get<number>('/tickets');
  return response.data;
};

interface DrawGift {
  count: number;
  giftId: number;
}

const postTicketsDraw = async (draws: DrawGift[]) => {
  const response = await client.post('/tickets', {
    draws,
  });
  return response;
};

// 현재는 응모권 하나씩, 한 상품에만 응모 가능
const drawOneGift = async (giftId: number) => {
  return postTicketsDraw([{ count: 1, giftId }]);
};

// TODO 로그인시 응모권 정보 가져오기
const useGetTickets = () => {
  const { setTickets } = useTicketStore();
  const query = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });
  const { data } = query;

  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data, setTickets]);

  return query;
};

const useDrawOneGift = () => {
  const { decreaseTickets } = useTicketStore();

  return useMutation({
    mutationFn: drawOneGift,
    onSuccess: () => {
      decreaseTickets(1);
    },
  });
};

export const useDraw = () => {
  const { setTickets } = useTicketStore();
};
