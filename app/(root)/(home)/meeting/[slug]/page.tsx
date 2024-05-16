"use client";
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetup from '@/components/MeetingSetup';
import useGetCallById from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import { useState } from 'react';

//slug is the id fetch from the url
export default function Meeting({ params }: { params: { slug: string } }) {
  
  const { user, isLoaded } = useUser();
  const [isSetup, setIsSetup] = useState(false);
  const { call, isLoading } = useGetCallById(params.slug);

  if (!isLoaded || isLoading) return <p>Loading...</p>

  return (
    <section className='h-screen w-full'>
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetup && <MeetingSetup setIsSetup={setIsSetup} />}
          {isSetup && <MeetingRoom />}
        </StreamTheme>
      </StreamCall>
    </section>
  )
}
