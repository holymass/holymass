import React from 'react';
import loadable from '@loadable/component';
import Loading from 'components/loading';

const ChurchMap = loadable(() => import('components/church_map'), {
  fallback: (<Loading />),
});

export default function ChurchModule() {
  return (
    <ChurchMap />
  );
}
