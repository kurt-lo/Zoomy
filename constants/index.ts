import { IconType } from "react-icons";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineUpcoming } from "react-icons/md";
import { GrCaretPrevious } from "react-icons/gr";
import { IoRecordingSharp } from "react-icons/io5";
import { MdOutlineBroadcastOnPersonal } from "react-icons/md";

interface SidebarLinks {
    label: string;
    icon: IconType;
    route: string;
}

export const sideBarLinks: SidebarLinks[] = [
    {
        label: 'Home',
        icon: IoHomeOutline,
        route: '/',
    },
    {
        label: 'Upcoming',
        icon: MdOutlineUpcoming,
        route: '/upcoming',
    },
    {
        label: 'Previous',
        icon: GrCaretPrevious,
        route: '/previous',
    },
    {
        label: 'Recordings',
        icon: IoRecordingSharp,
        route: '/recordings',
    },
    {
        label: 'Personal Room',
        icon: MdOutlineBroadcastOnPersonal,
        route: '/personal-room',
    }
]

export const avatarImages = [
    '/images/avatar-1.jpeg',
    '/images/avatar-2.jpeg',
    '/images/avatar-3.png',
    '/images/avatar-4.png',
    '/images/avatar-5.png',
  ];