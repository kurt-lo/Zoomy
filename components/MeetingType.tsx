"use client";

import { useState } from "react";
import MeetingCard from "./MeetingCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "./ui/textarea";
import ReactDatePicker from 'react-datepicker';

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

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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
      {/* MODAL FOR 1st Meeting Card */}
      <MeetingModal
        title='Start a Meeting'
        className='text-center'
        buttonText="Start Meeting"
        handleClick={createMeeting}
        isModalOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
      />
      {/* MODAL FOR 2nd Meeting Card */}
      {!callDetails ? (
        <MeetingModal
          title='Create Meeting'
          handleClick={createMeeting}
          isModalOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
        >
          <div className="flex flex-col gap-2">
            <label>Add Description</label>
            <Textarea className="text-primary border-none focus-visible:ring-0"
              onChange={(e) => setValues({ ...values, description: e.target.value })}
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Pick a Date and Time</label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:MM"
              timeIntervals={60}
              timeCaption="time"
              dateFormat="h:mm aa - MMMM d, yyyy"
              className="w-full rounded-lg text-primary px-4 py-2"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          title='Meeting Created'
          className='text-center'
          buttonText="Copy Link"
          isModalOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' })
          }}
        />
      )}
    </section>
  )
}
