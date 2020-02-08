import React from 'react';
import { Redirect } from 'react-router-dom';

export default function HomePage() {
  return (
    <Redirect
      to={{
        pathname: '/masses',
      }}
    />
  );
}
