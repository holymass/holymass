import { MetadataRoute } from 'next';
import liturgicalYearA from '@/features/mass/data/a.json';
import liturgicalYearB from '@/features/mass/data/b.json';
import liturgicalYearC from '@/features/mass/data/c.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://holymass.app';
  const masses = [];
  for (const liturgicalYear of [
    liturgicalYearA,
    liturgicalYearB,
    liturgicalYearC,
  ]) {
    for (const mass of liturgicalYear) {
      masses.push({
        url: `${baseUrl}/masses/${mass.liturgicalYear}/${mass.name}`,
        lastModified: new Date(),
        alternates: {
          languages: {
            en: `${baseUrl}/en/masses/${mass.liturgicalYear}/${mass.name}`,
            zh: `${baseUrl}/zh/masses/${mass.liturgicalYear}/${mass.name}`,
          },
        },
      });
    }
  }
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          zh: `${baseUrl}/zh`,
        },
      },
    },
  ].concat(masses);
}
