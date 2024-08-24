import { create } from 'zustand';

interface TicketStore {
  tickets: number; // 현재 응모권 개수
  setTickets: (tickets: number) => void; // 응모권 개수를 설정하는 메서드
  addTickets: (amount: number) => void; // 응모권을 추가하는 메서드
  decreaseTickets: (amount: number) => void; // 응모권을 제거하는 메서드
}

export const useTicketStore = create<TicketStore>((set) => ({
  tickets: 0,
  setTickets: (tickets: number) => set({ tickets }),
  addTickets: (amount: number) => set((state) => ({ tickets: state.tickets + amount })),
  decreaseTickets: (amount: number) => set((state) => ({ tickets: state.tickets - amount })),
}));
