import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

export default function Icon() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#1D3557', // Navy Deep
                    borderRadius: '20%',
                }}
            >
                <div
                    style={{
                        width: '120px',
                        height: '120px',
                        background: 'linear-gradient(to top right, #F4A261, #D4AF37)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                    }}
                >
                    <div style={{ width: 60, height: 60, background: 'white', borderRadius: '50%', opacity: 0.9 }}></div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
