import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/Loading';

const LanguageForm = loadable(
  () => import('../components/forms/LanguageForm'),
  {
    fallback: <Loading />,
  },
);

export default function SettingsModule() {
  return (
    <>
      <LanguageForm />
    </>
  );
}
