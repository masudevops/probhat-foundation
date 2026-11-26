import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Brand mark: amber rising sun on a forest-green disc (matches the header logo).
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
                    background: '#14532D',
                    border: '2px solid #C9922A',
                    borderRadius: '50%',
                }}
            >
                <div style={{ width: 13, height: 13, background: '#E8A830', borderRadius: '50%' }} />
            </div>
        ),
        { ...size }
    )
}
