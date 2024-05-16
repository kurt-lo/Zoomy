"use client";

import { useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast"

export default function MeetingType() {

  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setValues] = useState({ dateTime: new Date(), description: '', link: '' })
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast()

  const createMeeting = async () => {
    if (!user || !client) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Select Date and Time",
          description: "Please select a specific date and time",
        })
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error("Creating call failed");

      const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant meeting';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description
          }
        }
      })

      setCallDetails(call)
      toast({
        title: "Created meeting",
        description: "Enjoy meeting with your peeps",
      })

      if (!values.description) router.push(`/meeting/${call.id}`)
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to create meeting",
        description: "There's an unexpected error for creating a meeting",
      })
    }
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
