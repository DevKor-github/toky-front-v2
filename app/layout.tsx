import type { Metadata } from 'next';
import './globals.css';
import StyledComponentsRegistry from '@/libs/design-system/styled-components/registry';
import ThemeClient from '@/libs/design-system/styled-components/ThemeClient';
import { OverlayProvider } from '@/libs/design-system/overlay';
import QueryProvider from '@/libs/client/QueryProvider';
import { AuthProvider } from '@/libs/client/AuthProvider';
import { StoreProvider } from '@/libs/store/Providers/StoreProvider';
import { AuthLoader } from '@/libs/client/AuthLoader';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: '신나는 정기전 승부예측, TOKY',
  description:
    '경기 결과를 예측해봐요. 예측에 성공하면 경기가 종료된 후 응모권을 받을 수 있어요. 응모권을 이용해 경품 당첨에 도전하세요',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <meta httpEquiv="Permissions-Policy" content="web-share=(self)" />
      <body>
        <StyledComponentsRegistry>
          <ThemeClient>
            <StoreProvider>
              <QueryProvider>
                <OverlayProvider>
                  <AuthProvider />
                  <AuthLoader>
                    <main>{children}</main>
                  </AuthLoader>
                </OverlayProvider>
              </QueryProvider>
            </StoreProvider>
          </ThemeClient>
        </StyledComponentsRegistry>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
    </html>
  );
}
