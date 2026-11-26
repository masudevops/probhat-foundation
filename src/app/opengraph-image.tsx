import { ImageResponse } from 'next/og'

export const alt = 'Probhat Foundation — Where Deen and Dunya Grow Together'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const rings = [260, 360, 460, 560]

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '0 90px',
                    background: '#0E2318',
                    color: '#F5F0E8',
                    fontFamily: 'serif',
                    overflow: 'hidden',
                }}
            >
                {/* rising sun */}
                {rings.map((d, i) => (
                    <div
                        key={d}
                        style={{
                            position: 'absolute',
                            right: 140 - d / 2,
                            bottom: -d / 2,
                            width: d,
                            height: d,
                            borderRadius: '50%',
                            border: `2px solid rgba(232,168,48,${0.45 - i * 0.09})`,
                        }}
                    />
                ))}
                <div style={{ position: 'absolute', right: 40, bottom: -100, width: 200, height: 200, borderRadius: '50%', background: 'rgba(232,168,48,0.35)' }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#14532D', border: '3px solid #C9922A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#E8A830' }} />
                    </div>
                    <div style={{ fontSize: 40, fontWeight: 700 }}>Probhat Foundation</div>
                </div>
                <div style={{ marginTop: 48, fontSize: 76, fontWeight: 700, lineHeight: 1.05, maxWidth: 820 }}>Where Deen and Dunya Grow Together.</div>
                <div style={{ marginTop: 28, fontSize: 30, color: '#E8A830', fontFamily: 'sans-serif' }}>Education · Healthcare · Community Development</div>
                <div style={{ marginTop: 44, fontSize: 22, opacity: 0.6, fontFamily: 'sans-serif' }}>probhatfoundation.org</div>
            </div>
        ),
        { ...size }
    )
}
