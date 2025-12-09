import * as React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import dynamic from 'next/dynamic';

const MassSlides = dynamic(() => import('@/features/mass/MassSlides'));

type Params = { liturgicalYear: string; name: string };

type GenerateMetadataProps = {
  params: Params;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: GenerateMetadataProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const liturgicalYear = decodeURI(params.liturgicalYear);
  const name = decodeURI(params.name);
  return {
    title: `${liturgicalYear}${name} - HolyMass`,
    description: `${liturgicalYear}${name} - HolyMass`,
    keywords: ['HolyMass', '弥撒', liturgicalYear, name],
  };
}

export default async function MassPage({
  params,
}: Readonly<{
  params: Promise<Params>;
}>) {
  const { liturgicalYear, name } = await params;
  return <MassSlides liturgicalYear={liturgicalYear} name={name} />;
}
