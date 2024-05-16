"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { avatarImages } from "@/constants";
import { toast } from "./ui/use-toast";

interface MeetingCardProps {
    title: string;
    date: string;
    icon: string;
    isPreviousMeeting?: boolean;
    buttonIcon1?: string;
    buttonText?: string;
    handleClick: () => void;
    link: string;
}

export default function MeetingCallCard({ icon,
    title,
    date,
    isPreviousMeeting,
    buttonIcon1,
    handleClick,
    link,
    buttonText,
}: MeetingCardProps) {
    return (
        <section className="flex flex-col rounded-[14px] bg-stone-500 px-5 py-8 max-w-[30rem]">
            <article className="flex flex-col gap-5">
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                </div>
            </article>
            <article className={cn("flex items-center relative", {})}>
                {!isPreviousMeeting && (
                    <div className="flex gap-2 pt-4">
                        <Button onClick={handleClick} className="bg-primary px-6 rounded-xl">
                            {buttonText}
                        </Button>
                        <Button
                            onClick={() => {
                                navigator.clipboard.writeText(link);
                                toast({
                                    title: "Link Copied",
                                });
                            }}
                            className="bg-primary px-6 rounded-xl"
                        >
                            Copy Link
                        </Button>
                    </div>
                )}
            </article>
        </section>
    )
}
