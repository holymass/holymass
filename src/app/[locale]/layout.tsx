import * as React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HolyMass',
  description: 'HolyMass',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Record<string, string>;
}>) {
  const { locale } = params;
  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
