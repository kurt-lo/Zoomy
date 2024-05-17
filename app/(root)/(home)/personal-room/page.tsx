"use client";

import Table from '@/components/Table'
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import useGetCallById from '@/hooks/useGetCallById';
import { useClerk } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function PersonalRoom() {

  const { toast } = useToast();
  const { user } = useClerk();
  const meetingId = user?.id;

  const client = useStreamVideoClient();
  const { call } = useGetCallById(meetingId!);

  const router = useRouter();

  // for development
  // const meetingLink = `http://${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}/personal=true`
  // for production
  const meetingLink = `https://${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}/personal=true`

  const handleStartMeetingRoom = async () => {
    if (!user || !client) return;
    
    if (!call) {
      const newCall = client.call('default', meetingId!)
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }

    router.push(`/meeting/${meetingId}/?personal=true`)
  }

  return (
    <section className="flex flex-col size-full gap-10">
      <h1 className="text-3xl font-bold">Personal Room</h1>
      <div className='flex flex-col w-full xl:max-w-[900px] gap-8'>
        <Table
          title='Meeting Title'
          description={`${user?.username}'s meeting room`}
        />
        <Table
          title='Meeting ID'
          description={meetingId!}
        />
        <Table
          title='Meeting Link'
          description={meetingLink}
        />
      </div>
      <div className='flex gap-2'>
        <Button className='bg-stone-500 hover:border hover:border-white'
          onClick={handleStartMeetingRoom}>
          Start Meeting
        </Button>
        <Button
        className='bg-stone-500 hover:border hover:border-white'
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link copied'})
          }}  
        >
          Copy Link
        </Button>
      </div>
    </section>
  )
}
