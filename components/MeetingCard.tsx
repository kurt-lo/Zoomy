"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { IconType } from "react-icons";

interface HomeCardProps {
    className: string;
    title: string;
    description: string;
    handleClick: () => void
}

export default function MeetingCard({ title, description, className, handleClick }: HomeCardProps) {
    return (
        <div className={cn('flex flex-col justify-between w-full min-h-[260px] rounded-2xl bg-green-950 px-4 py-6 cursor-pointer', className)}
            onClick={handleClick}
        >
            <div>
                <h3 className="text-lg">{title}</h3>
                <p className="text-sm font-light">{description}</p>
            </div>
        </div>
    )
}
