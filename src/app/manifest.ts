import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IngenBoard',
    short_name: 'IngenBoard',
    description: 'AI-powered infinite whiteboard for thinking, planning, learning and collaboration.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0f',
    theme_color: '#0a0a0f',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    categories: ['productivity', 'design', 'education'],
  };
}
