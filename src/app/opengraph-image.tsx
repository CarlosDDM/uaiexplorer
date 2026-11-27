import { ImageResponse } from 'next/og';
import { SITE_NAME, SITE_URL } from '@/utils/constants/site-constants';

export const alt = 'UAIExplorer — Sites, sistemas e SEO sob medida';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

// Usa a fonte padrão do ImageResponse: sem rede no build do Docker
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px 100px',
        color: '#eef2ff',
        backgroundColor: '#000318',
        backgroundImage:
          'radial-gradient(circle at 80% 15%, rgba(99, 102, 241, 0.35) 0%, rgba(11, 22, 57, 0.6) 40%, #000318 75%)',
      }}
    >
      <div
        style={{
          width: 96,
          height: 8,
          borderRadius: 4,
          backgroundColor: '#0085FF',
          marginBottom: 40,
        }}
      />
      <div
        style={{
          fontSize: 140,
          fontWeight: 800,
          letterSpacing: -4,
          lineHeight: 1,
        }}
      >
        {SITE_NAME}
      </div>
      <div
        style={{
          fontSize: 52,
          marginTop: 36,
          color: '#c7d2fe',
          lineHeight: 1.2,
        }}
      >
        Sites, sistemas e SEO sob medida
      </div>
      <div
        style={{
          fontSize: 30,
          marginTop: 56,
          color: '#0085FF',
        }}
      >
        {SITE_HOST}
      </div>
    </div>,
    { ...size },
  );
}
