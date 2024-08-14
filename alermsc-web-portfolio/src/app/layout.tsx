import '@/styles/globals.scss';

import type { Metadata } from 'next';

import SmoothScroll from '@/components/smoothScroll';
import SEO from '@/config/seo.config';

export const metadata: Metadata = SEO;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SmoothScroll>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </SmoothScroll>
  );
}
