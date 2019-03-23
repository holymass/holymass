import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/loading';

const SetLanguage = loadable(() => import('components/forms/set_language'), {
  fallback: (<Loading />),
});

export default function SettingsModule() {
  return (
    <React.Fragment>
      <SetLanguage />
    </React.Fragment>
  );
}
