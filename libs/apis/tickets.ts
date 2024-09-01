import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import client from '../client/client';
import { useTicketStore } from '../store/Providers/TicketStoreProvider';
import { useAuthStore } from '../store/Providers/AuthStoreProvider';

export interface DrawGift {
  count: number;
  giftId: number;
}

export interface DrawGiftItem {
  id: number;
  name: string;
  alias: string;
  requiredTicket: number;
  photoUrl: string;
  count: number;
}

export interface MyDrawGifts {
  draws: DrawGift[];
}

export interface TicketHistoryItem {
  id: number;
  detail: string;
  usedTicket: number;
  remainingTicket: number;
  createdAt: string;
}

const getTickets = async () => {
  const response = await client.get<number>('/ticket');
  return response.data;
};

const getGiftItems = async () => {
  const response = await client.get<DrawGiftItem[]>('/ticket/gift');
  return response.data;
};

const getMyTicketsUse = async () => {
  const response = await client.get<MyDrawGifts>('/ticket/draw');
  return response.data.draws;
};

const getTicketHistoryList = async () => {
  const response = await client.get<TicketHistoryItem[]>('/ticket/history');
  return response.data;
};

const postTicketsDraw = async (draws: DrawGift[]) => {
  const response = await client.post('/ticket/draw', {
    draws,
  });
  return response;
};

// 현재는 응모권 하나씩, 한 상품에만 응모 가능
const drawOneGift = async (giftId: number) => {
  return postTicketsDraw([{ count: 1, giftId }]);
};

export const useGetTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
    enabled: false,
  });
};

export const useGetGiftItems = () => {
  return useQuery({
    queryKey: ['gift-items'],
    queryFn: getGiftItems,
  });
};

export const useGetMyTicketsUse = () => {
  return useQuery({
    queryKey: ['my-tickets-use'],
    queryFn: getMyTicketsUse,
    enabled: false,
  });
};

export const useDrawOneGift = (onSuccessFunction: () => void, giftId: number) => {
  const isLogin = useAuthStore((state) => state.isLogin);
  const queryClient = useQueryClient();
  const { refetch: refetchTickets } = useGetTickets();
  const { refetch: refetchMyTicketsUse, data } = useGetMyTicketsUse();
  const { refetch: refetchGiftItems } = useGetGiftItems();

  const decreaseTickets = useTicketStore((state) => state.decreaseTickets);

  return useMutation({
    mutationFn: drawOneGift,
    onSuccess: () => {
      decreaseTickets(1);
      onSuccessFunction();
      queryClient.setQueryData(['my-tickets-use'], (myDraws: DrawGift[]) => {
        const draw = myDraws.find((draw) => draw.giftId === giftId);
        if (draw) {
          return myDraws.map((item) => {
            if (item.giftId === giftId) {
              return {
                ...item,
                count: item.count + 1,
              };
            }
            return {
              ...item,
            };
          });
        }
        return [...myDraws, { count: 1, giftId }];
      });

      queryClient.setQueryData(['gift-items'], (giftItems: DrawGiftItem[]) => {
        return giftItems.map((item) => {
          if (item.id === giftId) {
            return {
              ...item,
              count: item.count + 1,
            };
          }
          return {
            ...item,
          };
        });
      });
    },
    onError: () => {
      refetchGiftItems();
      if (isLogin) {
        refetchMyTicketsUse();
        refetchTickets();
      }
    },
  });
};

export const useGetTicketHistoryList = () => {
  return useQuery({
    queryKey: ['ticket-history'],
    queryFn: getTicketHistoryList,
  });
};
