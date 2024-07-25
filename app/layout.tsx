import type { Metadata } from 'next';
import './globals.css';
import StyledComponentsRegistry from '@/libs/design-system/styled-components/registry';
import ThemeClient from '@/libs/design-system/styled-components/ThemeClient';
import { OverlayProvider } from '@/libs/design-system/overlay';

export const metadata: Metadata = {
  title: '신나는 정기전 승부예측, TOKY',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <StyledComponentsRegistry>
          <ThemeClient>
            <OverlayProvider>
              <main>{children}</main>
            </OverlayProvider>
          </ThemeClient>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
