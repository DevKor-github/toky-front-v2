import { type ReactNode } from 'react';
import { ProfileStoreProvider } from './ProfileStoreProvider';
import { TicketStoreProvider } from './TicketStoreProvider';

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <ProfileStoreProvider>
      <TicketStoreProvider>{children}</TicketStoreProvider>
    </ProfileStoreProvider>
  );
}
