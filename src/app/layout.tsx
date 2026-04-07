import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppToaster } from '@/components/providers/AppToaster';
import { QueryProvider } from '@/components/providers/QueryProvider';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: { default: 'Idea Hub', template: '%s · Idea Hub' },
  description: 'Share, discover, and collaborate on ideas',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <QueryProvider>
            <ErrorBoundary>{children}</ErrorBoundary>
            <AppToaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
