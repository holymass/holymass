'server-only';

import { createIntl } from '@formatjs/intl';

export default async function getIntl(locale: string) {
  return createIntl({
    locale: locale,
    messages: (await import(`./locales/${locale}.json`)).default,
  });
}
