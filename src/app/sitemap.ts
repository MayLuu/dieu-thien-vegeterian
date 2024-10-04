import { MetadataRoute } from 'next';

const BASE_URL = 'https://amthucchaydieuthien.com';

const locales = ['vi', 'en', 'zh']; 

const getDynamicPaths = () => {
  return [
    { slug: 'menu' },
    { slug: 'order' },
    { slug: 'events' },
  ];
};

export default function sitemap(): MetadataRoute.Sitemap {
  const dynamicPaths = getDynamicPaths();
  const urls: MetadataRoute.Sitemap = [];

  urls.push({
    url: `${BASE_URL}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 1,
  });

  locales.forEach((locale) => {
    dynamicPaths.forEach((path) => {
      urls.push({
        url: `${BASE_URL}/${locale}/${path.slug}`,
        lastModified: new Date(),
        changeFrequency: path.slug === 'menu' ? 'monthly' : 'weekly',
        priority: path.slug === 'menu' ? 0.8 : 0.5,
      });
    });
  });

  return urls;
}
