'use client';

import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {

    const pathName = usePathname();

    return (
        <section className="flex flex-col justify-between bg-stone-800 sticky left-0 top-0 h-screen w-fit p-6 pt-28 max-sm:hidden lg:w-[264px]">
            <div className="flex flex-col flex-1 gap-6">
                {sideBarLinks.map((link) => {
                    const isActive = pathName === link.route;
                    return (
                        <Link href={link.route} key={link.label} className={cn('flex items-center gap-4 p-4 rounded-lg', { 'bg-stone-500': isActive })}>
                            {<link.icon size={22} />}
                            <p className="max-lg:hidden">{link.label}</p>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}
