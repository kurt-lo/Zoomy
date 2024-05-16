import StreamClientProvider from '@/stream/StreamClientProvider'
import React, { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <main>
            <StreamClientProvider>
                {children}
            </StreamClientProvider>
        </main>
    )
}
