import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tracker Tokens - Block trackers, earn tokens, own your data',
  description: 'A browser extension and Farcaster Frame that blocks online trackers and rewards users with tokens for their attention and opted-in data.',
  keywords: ['privacy', 'blockchain', 'tokens', 'tracker blocking', 'Base', 'Farcaster'],
  authors: [{ name: 'Tracker Tokens Team' }],
  openGraph: {
    title: 'Tracker Tokens',
    description: 'Block trackers, earn tokens, own your data.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
