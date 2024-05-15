import { SignIn } from '@clerk/nextjs'
import React from 'react'

export default function SignInPage() {
  return (
    <main className='flex items-center justify-center h-screen'>
        <SignIn />
    </main>
  )
}
