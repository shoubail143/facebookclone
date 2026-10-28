"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bookmark,
  CalendarDays,
  ChevronRight,
  Clock3,
  Gamepad2,
  HelpCircle,
  History,
  Store,
  Users,
  Video,
} from "lucide-react";

const menuItems = [
  { label: "Meta AI", href: "/meta-ai", icon: HelpCircle, iconClass: "text-violet-500" },
  { label: "Friends", href: "/friends", icon: Users, iconClass: "text-sky-500" },
  { label: "Memories", href: "/memories", icon: Clock3, iconClass: "text-sky-500" },
  { label: "Saved", href: "/saved", icon: Bookmark, iconClass: "text-violet-500" },
  { label: "Groups", href: "/groups", icon: Users, iconClass: "text-sky-500" },
  { label: "Reels", href: "/reels", icon: Video, iconClass: "text-rose-500" },
  { label: "Marketplace", href: "/marketplace", icon: Store, iconClass: "text-sky-500" },
  { label: "Feeds", href: "/feeds", icon: History, iconClass: "text-sky-500" },
  { label: "Events", href: "/events", icon: CalendarDays, iconClass: "text-rose-500" },
];

export default function LeftSidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 bottom-0 top-14 hidden w-[360px] overflow-y-auto bg-[#18191a] px-2 py-4 text-gray-100 scrollbar-thin lg:block">
      <nav aria-label="Main navigation" className="space-y-1">
        <Link
          href="/profile"
          className={`flex h-[52px] w-full items-center gap-3 rounded-lg px-2 text-left text-[17px] font-semibold hover:bg-[#3a3b3c] ${pathname === "/profile" ? "bg-[#263951] text-[#70a7ff]" : ""}`}
        >
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-[#3a3b3c]">
            <Image
              src="https://i.pravatar.cc/150?img=11"
              alt="Shoubail Akhtar"
              fill
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="min-w-0 flex-1"><span className="block">Shoubail Akhtar</span><span className="block text-xs font-normal text-[#b0b3b8]">View your profile</span></span>
          <span className="relative flex h-3 w-3 shrink-0"><span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-green-500 opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full border-2 border-[#18191a] bg-green-500" /></span>
        </Link>

        {menuItems.map(({ label, href, icon: Icon, iconClass }) => (
          <Link
            href={href}
            key={label}
            className="flex h-[52px] w-full items-center gap-3 rounded-lg px-2 text-left text-[17px] font-medium hover:bg-[#3a3b3c]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full">
              <Icon size={30} strokeWidth={2.4} className={iconClass} />
            </span>
            <span>{label}</span>
          </Link>
        ))}

        <button
          type="button"
          className="flex h-[52px] w-full items-center gap-3 rounded-lg px-2 text-left text-[17px] font-medium hover:bg-[#3a3b3c]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a3b3c]">
            <ChevronRight size={24} />
          </span>
          <span>See more</span>
        </button>

        <button
          type="button"
          className="mt-1 flex h-[52px] w-full items-center gap-3 rounded-lg px-2 text-left text-[17px] font-medium hover:bg-[#3a3b3c] xl:hidden"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3a3b3c]">
            <Gamepad2 size={24} />
          </span>
          <span>Gaming</span>
        </button>
      </nav>
    </aside>
  );
}
