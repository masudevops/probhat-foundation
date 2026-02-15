import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Probhat Foundation'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#1D3557', // Navy Deep
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            background: 'linear-gradient(to top right, #F4A261, #D4AF37)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: 30,
                            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                        }}
                    >
                        <div style={{ width: 50, height: 50, background: 'white', borderRadius: '50%', opacity: 0.9 }}></div>
                    </div>
                    <div style={{ fontSize: 80, fontWeight: 800, letterSpacing: -2 }}>
                        Probhat Foundation
                    </div>
                </div>
                <div style={{ fontSize: 36, opacity: 0.8, fontWeight: 400 }}>
                    Hope. Support. Progress.
                </div>
                <div
                    style={{
                        position: 'absolute',
                        bottom: 40,
                        fontSize: 24,
                        opacity: 0.5,
                        background: 'rgba(255,255,255,0.1)',
                        padding: '10px 20px',
                        borderRadius: 99
                    }}
                >
                    probhatfoundation.org
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
