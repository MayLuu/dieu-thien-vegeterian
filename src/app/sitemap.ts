// src/app/sitemap.ts
import { MetadataRoute } from 'next';

const BASE_URL = 'https://amthucchaydieuthien.com';

const staticPaths = [
  '/',
  '/about',
  '/menu',
  '/order',
  '/events',
  '/contact'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  staticPaths.forEach((path) => {
    urls.push({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: path === '/' ? 1 : 0.8,
    });
  });

  return urls;
}
