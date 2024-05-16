"use client";

import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function MeetingSetup({ setIsSetup }: { setIsSetup: (value: boolean) => void }) {

    const [isCamMicOn, setIsCamMicOn] = useState(false);
    const call = useCall();

    if (!call) throw new Error("use call must be in streamcall component");

    const handleClickJoin = () => {
        call.join();
        setIsSetup(true);
    }

    useEffect(() => {
        if (isCamMicOn) {
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isCamMicOn, call?.camera, call?.microphone])

    return (
        <div className="flex flex-col items-center justify-center gap-3 h-screen w-full">
            <h1>Setup</h1>
            <VideoPreview />
            <div className="flex items-center justify-center gap-3 h-16">
                <label className="flex items-center justify-center gap-2">
                    <input type="checkbox" checked={isCamMicOn} onChange={(e) => setIsCamMicOn(e.target.checked)} />
                    On/off your camera and mic
                </label>
                <DeviceSettings />
            </div>
            <Button className=" bg-white text-primary rounded-md hover:text-white hover:border hover:border-white"
                onClick={handleClickJoin}
            >
                Join a meeting
            </Button>
        </div>
    )
}
