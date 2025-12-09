import * as React from 'react';
import type { Metadata } from 'next';
import { GoogleAnalytics } from '@next/third-parties/google';

export const metadata: Metadata = {
  title: 'HolyMass',
  description: 'HolyMass',
  keywords: ['HolyMass', '弥撒'],
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
      <GoogleAnalytics gaId="G-2SRHLXWNZ4" />
    </html>
  );
}
