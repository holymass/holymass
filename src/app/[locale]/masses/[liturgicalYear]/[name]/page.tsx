import * as React from 'react';
import dynamic from 'next/dynamic';

const MassSlides = dynamic(() => import('@/features/mass/MassSlides'), {
  ssr: false,
});

export default function MassPage({
  params,
}: Readonly<{
  params: Record<string, string>;
}>) {
  const { liturgicalYear, name } = params;
  return <MassSlides liturgicalYear={liturgicalYear} name={name} />;
}
