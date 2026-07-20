import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Apple touch icon — Idea Hub “Orbit” mark. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0A0A0A',
          borderRadius: 42,
          position: 'relative',
        }}
      >
        {/* Orbit ring */}
        <div
          style={{
            position: 'absolute',
            width: 108,
            height: 108,
            borderRadius: 999,
            border: '7px solid #EDEDEB',
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
            transform: 'rotate(-35deg)',
          }}
        />
        {/* Satellite node */}
        <div
          style={{
            position: 'absolute',
            width: 18,
            height: 18,
            borderRadius: 999,
            background: '#FAFAF9',
            top: 28,
          }}
        />
        {/* Hub */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 999,
            background: '#0F766E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: '#FAFAF9',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
