import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import React, { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <main className='relative'>
            <Navbar />
            <div className='flex'>
                <section className='flex flex-col flex-1 px-4 md:px-8 min-h-screen pt-28 max-md:pb-14'>
                    <div className='w-full'>
                        {children}
                    </div>
                </section>
                <Footer />
            </div>
        </main>
    )
}
