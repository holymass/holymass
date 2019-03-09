import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/loading';

const MassList = loadable(() => import('components/mass_list'), {
  fallback: (<Loading />),
});

export default function MassModule() {
  return (
    <MassList />
  );
}
