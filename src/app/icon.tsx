import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F4A261', // Sunrise Orange
                    borderRadius: '50%',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(to top right, #F4A261, #D4AF37)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    {/* Using a simple sun-like character/circle for favicon as we can't easily import Lucide icons in Edge runtime without hassle */}
                    <div style={{ width: 14, height: 14, background: 'white', borderRadius: '50%', opacity: 0.9 }}></div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
