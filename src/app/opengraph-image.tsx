import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'مَعِين | معينك اليومي من القرآن والسنة';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #061912 0%, #0A261E 50%, #04100C 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '40px',
          border: '12px solid #C9A227',
        }}
      >
        {/* Subtle decorative inner border */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            right: '20px',
            bottom: '20px',
            border: '2px solid rgba(240, 202, 80, 0.4)',
            borderRadius: '16px',
          }}
        />

        {/* Logo Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '110px',
            height: '110px',
            borderRadius: '32px',
            background: '#0F382C',
            border: '3px solid #F0CA50',
            color: '#F0CA50',
            fontSize: '60px',
            fontWeight: '900',
            marginBottom: '25px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          }}
        >
          م
        </div>

        {/* Title */}
        <div
          style={{
            color: '#FFFFFF',
            fontSize: '68px',
            fontWeight: '900',
            textAlign: 'center',
            marginBottom: '15px',
            letterSpacing: '-1px',
          }}
        >
          مَنَصَّةُ مَعِين | Maeen
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: '#F0CA50',
            fontSize: '32px',
            fontWeight: '700',
            textAlign: 'center',
            marginBottom: '35px',
          }}
        >
          معينك اليومي من القرآن الكريم والسنة النبوية
        </div>

        {/* Features Row */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(240, 202, 80, 0.5)',
              borderRadius: '20px',
              padding: '12px 24px',
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: '700',
            }}
          >
            📖 صفحة يومية بتفسيرها المعتمد
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(240, 202, 80, 0.5)',
              borderRadius: '20px',
              padding: '12px 24px',
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: '700',
            }}
          >
            📜 حديث نبوي صحيح وأثره
          </div>
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(240, 202, 80, 0.5)',
              borderRadius: '20px',
              padding: '12px 24px',
              color: '#FFFFFF',
              fontSize: '20px',
              fontWeight: '700',
            }}
          >
            🎧 تلاوة صوتية متواصلة
          </div>
        </div>

        {/* Domain footer */}
        <div
          style={{
            position: 'absolute',
            bottom: '35px',
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '18px',
            fontWeight: '600',
          }}
        >
          https://maeen-app-five.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
