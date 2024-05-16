'use client';

import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {

    const pathName = usePathname();

    return (
        <section className="fixed bottom-0 flex backdrop-blur-sm rounded-lg justify-center w-full shadow-2xl">
            <div className="flex">
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
