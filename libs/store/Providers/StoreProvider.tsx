import { type ReactNode } from 'react';
import { AuthStoreProvider } from './AuthStoreProvider';
import { ProfileStoreProvider } from './ProfileStoreProvider';
import { TicketStoreProvider } from './TicketStoreProvider';

export function StoreProvider({ children }: { children: ReactNode }) {
  return (
    <AuthStoreProvider>
      <ProfileStoreProvider>
        <TicketStoreProvider>{children}</TicketStoreProvider>
      </ProfileStoreProvider>
    </AuthStoreProvider>
  );
}
