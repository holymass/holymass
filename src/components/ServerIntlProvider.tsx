'use client';

import * as React from 'react';
import { IntlProvider, MessageFormatElement } from 'react-intl';

interface ServerIntlProviderProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
}

export default function ServerIntlProvider({
  children,
  locale,
  messages,
}: ServerIntlProviderProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}
