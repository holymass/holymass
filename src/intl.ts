'server-only';

import { createIntl } from '@formatjs/intl';

import intlConfig from '@/intlConfig';

export default async function getIntl(locale: string) {
  return createIntl({
    defaultLocale: intlConfig.defaultLocale,
    locale: locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  });
}
