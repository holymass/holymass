import * as React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';

const MassSlides = dynamic(() => import('@/features/mass/MassSlides'), {
  ssr: false,
});

type GenerateMetadataProps = {
  params: { liturgicalYear: string; name: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: GenerateMetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const liturgicalYear = decodeURI(params.liturgicalYear);
  const name = decodeURI(params.name);
  return {
    title: `HolyMass - ${liturgicalYear}${name}`,
    description: `HolyMass - ${liturgicalYear}${name}`,
    keywords: ['HolyMass', '弥撒', liturgicalYear, name],
  };
}

export default function MassPage({
  params,
}: Readonly<{
  params: Record<string, string>;
}>) {
  const { liturgicalYear, name } = params;
  return <MassSlides liturgicalYear={liturgicalYear} name={name} />;
}
