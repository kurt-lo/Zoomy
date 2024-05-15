import React from 'react'

export default function Meeting({ params }: { params: { slug: string } }) {
  return (
    <div>Meeting Room: #{params.slug}</div>
  )
}
