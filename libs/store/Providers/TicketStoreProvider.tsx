'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { creaeteTicketStore, TicketStore } from '../ticketStore';

export type TicketStoreApi = ReturnType<typeof creaeteTicketStore>;

export const TicketStoreContext = createContext<TicketStoreApi | undefined>(undefined);

export interface TicketStoreProviderProps {
  children: ReactNode;
}

export const TicketStoreProvider = ({ children }: TicketStoreProviderProps) => {
  const storeRef = useRef<TicketStoreApi>();
  if (!storeRef.current) {
    storeRef.current = creaeteTicketStore();
  }

  return <TicketStoreContext.Provider value={storeRef.current}>{children}</TicketStoreContext.Provider>;
};

export const useTicketStore = <T,>(selector: (store: TicketStore) => T): T => {
  const counterStoreContext = useContext(TicketStoreContext);

  if (!counterStoreContext) {
    throw new Error(`useTicketStore must be used within TicketStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
