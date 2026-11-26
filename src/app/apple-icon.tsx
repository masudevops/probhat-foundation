import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

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
                    background: '#0E2318',
                }}
            >
                <div
                    style={{
                        width: 120,
                        height: 120,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#14532D',
                        border: '4px solid #C9922A',
                        borderRadius: '50%',
                    }}
                >
                    <div style={{ width: 52, height: 52, background: '#E8A830', borderRadius: '50%' }} />
                </div>
            </div>
        ),
        { ...size }
    )
}
