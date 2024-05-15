import Link from "next/link";
import { FcConferenceCall } from "react-icons/fc";
import MobileNav from "./MobileNav";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center fixed z-40 w-full bg-stone-800 px-6 py-4 lg:px-10">
      <Link href='/' className="flex items-center gap-2">
        <FcConferenceCall className="max-sm:size-10" size={30} />
        <p className="text-2xl font-bold max-sm:hidden">Zoomy</p>
      </Link>
      <div className="flex justify-between items-center gap-5">
        <header>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header>
        <MobileNav />
      </div>
    </nav>
  )
}
