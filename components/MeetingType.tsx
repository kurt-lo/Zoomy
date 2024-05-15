"use client";

import { useState } from "react";
import MeetingCard from "./MeetingCard";
import { FiPlusCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";

export default function MeetingType() {

  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();

  const createMeeting = () => {

  }

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <MeetingCard
        title='New meeting'
        description="Start a new meeting"
        className="bg-green-900"
        handleClick={() => setMeetingState('isInstantMeeting')}
      />
      <MeetingCard
        title='Schedule meeting'
        description="Start a schedule meeting"
        className="bg-blue-900"
        handleClick={() => setMeetingState('isScheduleMeeting')}
      />
      <MeetingCard
        title='View Recordings'
        description="Check recorded meeting"
        className="bg-pink-900"
        handleClick={() => router.push('/recordings')}
      />
      <MeetingCard
        title='Join meeting'
        description="Join a new meeting"
        className="bg-yellow-900"
        handleClick={() => setMeetingState('isJoiningMeeting')}
      />
      <MeetingModal
        title='Start a Meeting'
        className='text-center'
        buttonText="Start Meeting"
        handleClick={createMeeting}
        isModalOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
      />
    </section>
  )
}
