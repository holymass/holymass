"use client";

import * as React from "react";
import { IntlProvider, MessageFormatElement } from "react-intl";

import intlConfig from "@/intlConfig";

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
    <IntlProvider
      defaultLocale={intlConfig.defaultLocale}
      locale={locale}
      messages={messages}
    >
      {children}
    </IntlProvider>
  );
}
