"use client";

import { cn } from "@/lib/utils";
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";
import { useState } from "react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { TbLayoutList } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

export default function MeetingRoom() {

    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get('personal');
    const [layout, setLayout] = useState('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false);
    
    const router = useRouter();

    const { useCallCallingState} = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) return <p>Loading please wait...</p>

    const MeetingRoomLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />
            default:
                return <SpeakerLayout participantsBarPosition='right' />
        }
    }

    return (
        <section className="relative w-full overflow-hidden pt-4">
            <div className="flex items-center justify-center relative size-full">
                <div className="flex items-center size-full max-w-[1000px]">
                    <MeetingRoomLayout />
                </div>
                <div className={cn('h-[calc(70vh-100px)] hidden ml-2', {
                    'block w-full max-w-[200px] bg-stone-500 rounded-lg py-4 px-2': showParticipants,
                })}>
                    <CallParticipantsList onClose={() => setShowParticipants(false)} />
                </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4">
                <CallControls onLeave={() => router.push('/')} />
                <DropdownMenu>
                    <div className="flex items-center justify-center">
                        <DropdownMenuTrigger className="cursor-pointer">
                            <TbLayoutList size={24} />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent>
                        {['Grid', 'Speaker-Left', 'Speaker-Right'].map((item, index) => (
                            <div key={index}>
                                <DropdownMenuItem className="cursor-pointer"
                                    onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}
                                >
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <CallStatsButton />
                <button className=""
                    onClick={() => setShowParticipants(prevState => !prevState)}>
                    <div className="cursor-pointer rounded-2xl">
                        <FaUsers size={24} />
                    </div>
                </button>
                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    )
}
