import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/mp-admin-x7k2/',
    },
    sitemap: 'https://mineproductions.net/sitemap.xml',
  };
}
