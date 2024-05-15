"use client";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FcConferenceCall } from "react-icons/fc";
import { TiThMenu } from "react-icons/ti";

export default function MobileNav() {

    const pathName = usePathname();

    return (
        <section className='w-full max-w-[264px]'>
            <Sheet>
                <SheetTrigger>
                    <TiThMenu size={24} />
                </SheetTrigger>
                <SheetContent className="bg-stone-800">
                    <Link href='/' className="flex items-center gap-2">
                        <FcConferenceCall className="max-sm:size-10" size={30} />
                        <p className="text-2xl font-bold max-sm:hidden">Zoomy</p>
                    </Link>
                    <div className="flex flex-col justify-between h-[calc(100vh-72px)] overflow-y-auto">
                        <SheetClose className="flex flex-col h-full gap-6 pt-16">
                            {sideBarLinks.map((link) => {
                                const isActive = pathName === link.route;
                                return (
                                    <SheetClose key={link.label} asChild>
                                    <Link href={link.route} className={cn('flex items-center gap-4 p-4 rounded-lg w-full', { 'bg-stone-500': isActive })}>
                                        {<link.icon size={20} />}
                                        <p className="max-lg:hidden">{link.label}</p>
                                    </Link>
                                    </SheetClose>
                                )
                            })}
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}
