"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  Edit3,
  Gamepad2,
  Home,
  Menu,
  MoreHorizontal,
  MessageCircle,
  MonitorPlay,
  Search,
  Store,
  Users,
} from "lucide-react";

const navigationItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Watch", href: "/reels", icon: MonitorPlay },
  { label: "Marketplace", href: "/marketplace", icon: Store },
  { label: "Groups", href: "/groups", icon: Users },
  { label: "Gaming", href: "/gaming", icon: Gamepad2 },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openPanel, setOpenPanel] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const recentSearches = [
    "Friends",
    "Marketplace",
    "Facebook Reels",
    "Groups",
    "Gaming",
    "Events",
    "Saved",
  ];
  const searchableItems = [
    ...recentSearches.map((label) => ({
      label,
      href: "/search?q=" + encodeURIComponent(label),
      category: "Search",
    })),
    ...navigationItems.map(({ label, href }) => ({
      label,
      href,
      category: "Menu",
    })),
  ];
  const searchSuggestions = searchableItems
    .filter(
      (item) =>
        !query.trim() ||
        `${item.label} ${item.category}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    )
    .slice(0, 6);

  function submitSearch(event) {
    event.preventDefault();
    if (query.trim())
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <>
      <nav className="sticky top-0 z-50 flex h-14 w-full items-center justify-between bg-[#242526] px-4 text-gray-300 shadow-md">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Link
            href="/"
            aria-label="Facebook home"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
              <path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
            </svg>
          </Link>

          <form
            onSubmit={submitSearch}
            className="relative hidden items-center rounded-full bg-[#3a3b3c] px-3 sm:flex"
          >
            <Search
              size={18}
              className="shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() =>
                window.setTimeout(() => setSearchFocused(false), 150)
              }
              type="search"
              aria-label="Search Facebook"
              placeholder="Search Facebook"
              className="h-10 w-36 bg-transparent px-2 text-sm text-gray-200 outline-none placeholder:text-gray-400 xl:w-52"
            />
            {searchFocused && (
              <div className="absolute left-0 top-12 w-[320px] rounded-lg bg-[#242526] p-2 shadow-2xl ring-1 ring-white/10">
                <p className="px-2 py-1 text-sm font-semibold text-gray-200">
                  {query.trim() ? "Search results" : "Recent searches"}
                </p>
                {searchSuggestions.map((item) => (
                  <button
                    key={`${item.label}-${item.href}`}
                    type="button"
                    onClick={() => {
                      setQuery(item.label);
                      router.push(
                        item.href.startsWith("/") && item.category === "Menu"
                          ? item.href
                          : `/search?q=${encodeURIComponent(item.label)}`,
                      );
                    }}
                    className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm text-gray-200 hover:bg-[#3a3b3c]"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3a3b3c]">
                      <Search size={16} />
                    </span>
                    <span className="min-w-0 flex-1">{item.label}</span>
                    <span className="text-xs text-gray-400">
                      {item.category}
                    </span>
                  </button>
                ))}
                {query.trim() && searchSuggestions.length === 0 && (
                  <button
                    type="submit"
                    className="w-full rounded-lg px-3 py-3 text-left text-sm text-blue-400 hover:bg-[#3a3b3c]"
                  >
                    Search for “{query.trim()}”
                  </button>
                )}
              </div>
            )}
          </form>
        </div>

        <div className="absolute left-1/2 hidden h-full -translate-x-1/2 items-center justify-center md:flex">
          {navigationItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className={`relative flex h-full w-28 items-center justify-center rounded-lg transition-colors hover:bg-[#3a3b3c] ${
                  active ? "text-blue-500" : "text-gray-400"
                }`}
              >
                <Icon size={28} aria-hidden="true" />
                {active && (
                  <span className="absolute bottom-0 h-[3px] w-full rounded-t-md bg-blue-500" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2">
          <button
            type="button"
            aria-label="Search"
            onClick={() => {
              setOpenPanel(null);
              setShowMobileSearch(true);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3a3b3c] sm:hidden"
          >
            <Search size={20} />
          </button>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpenPanel(openPanel === "menu" ? null : "menu")}
            aria-expanded={openPanel === "menu"}
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#3a3b3c] text-gray-200 transition-colors hover:bg-gray-600 sm:flex"
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setOpenPanel(openPanel === "messenger" ? null : "messenger")}
            aria-label="Messenger"
            aria-expanded={openPanel === "messenger"}
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#3a3b3c] text-gray-200 transition-colors hover:bg-gray-600"
          >
            <MessageCircle size={20} aria-hidden="true" />
            <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full border-2 border-[#242526] bg-red-500" />
          </button>
          <button
            type="button"
            aria-label="Notifications, 3 unread"
            onClick={() =>
              setOpenPanel(
                openPanel === "notifications" ? null : "notifications",
              )
            }
            aria-expanded={openPanel === "notifications"}
            className="relative hidden h-10 w-10 items-center justify-center rounded-full bg-[#3a3b3c] text-gray-200 transition-colors hover:bg-gray-600 sm:flex"
          >
            <Bell size={20} aria-hidden="true" />
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
              3
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              setOpenPanel(openPanel === "profile" ? null : "profile")
            }
            aria-label="Profile and account menu"
            aria-expanded={openPanel === "profile"}
            className="ml-1 h-10 w-10 shrink-0 overflow-hidden rounded-full border border-gray-600 bg-[#3a3b3c] transition hover:ring-2 hover:ring-[#b0b3b8]"
          >
            <Image
              src="https://i.pravatar.cc/150?img=11"
              alt="Your profile"
              width={40}
              height={40}
              unoptimized
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </nav>

      {showMobileSearch && (
        <form
          onSubmit={(event) => {
            submitSearch(event);
            setShowMobileSearch(false);
          }}
          className="fixed left-0 right-0 top-0 z-[70] flex h-14 items-center gap-2 bg-[#242526] px-2"
        >
          <button
            type="button"
            aria-label="Close search"
            onClick={() => setShowMobileSearch(false)}
            className="text-2xl text-gray-300"
          >
            ←
          </button>
          <div className="flex flex-1 items-center rounded-full bg-[#3a3b3c] px-3">
            <Search size={18} className="text-gray-400" />
            <input
              autoFocus
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Mobile search"
              placeholder="Search Facebook"
              className="h-10 min-w-0 flex-1 bg-transparent px-2 text-gray-200 outline-none"
            />
          </div>
        </form>
      )}

      <div className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t border-[#3e4042] bg-[#242526] md:hidden">
        {navigationItems.slice(0, 4).map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className={`flex h-full flex-1 items-center justify-center border-t-[3px] ${active ? "border-blue-500 text-blue-500" : "border-transparent text-gray-400"}`}
            >
              <Icon size={24} />
            </Link>
          );
        })}
      </div>

      {openPanel && (
        <div className="fixed right-3 top-16 z-[60] w-[min(360px,calc(100vw-24px))] rounded-lg bg-[#242526] p-2 shadow-2xl ring-1 ring-white/10">
          {openPanel === "messenger" ? (
            <div>
              <div className="flex items-center justify-between px-2 pb-2"><h2 className="text-xl font-bold text-white">Chats</h2><div className="flex gap-1"><button aria-label="Chat options" className="rounded-full p-2 text-gray-300 hover:bg-[#3a3b3c]"><MoreHorizontal size={20} /></button><Link href="/messenger" onClick={() => setOpenPanel(null)} aria-label="Open new chat" className="rounded-full p-2 text-gray-300 hover:bg-[#3a3b3c]"><Edit3 size={20} /></Link></div></div>
              <div className="mb-2 flex items-center rounded-full bg-[#3a3b3c] px-3"><Search size={18} className="text-gray-400" /><input placeholder="Search Messenger" aria-label="Search Messenger" className="h-9 min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none" /></div>
              {[{name:"Ayesha Khan",id:13,preview:"See you tomorrow!",time:"2m"},{name:"Burhan Khan",id:12,preview:"That photo looks great",time:"18m"},{name:"Sara Ahmed",id:15,preview:"Sounds like a plan",time:"1h"}].map((chat) => <Link href="/messenger" key={chat.name} onClick={() => setOpenPanel(null)} className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-[#3a3b3c]"><Image src={`https://i.pravatar.cc/150?img=${chat.id}`} alt="" width={44} height={44} unoptimized className="rounded-full" /><div className="min-w-0 flex-1"><p className="font-semibold text-white">{chat.name}</p><p className="truncate text-xs text-[#b0b3b8]">{chat.preview} · {chat.time}</p></div><span className="h-2 w-2 rounded-full bg-[#0866ff]" /></Link>)}
              <Link href="/messenger" onClick={() => setOpenPanel(null)} className="mt-2 block rounded-lg py-2 text-center text-sm font-semibold text-[#2e89ff] hover:bg-[#3a3b3c]">See all in Messenger</Link>
            </div>
          ) : openPanel === "profile" ? (
            <div>
              <Link
                href="/profile"
                onClick={() => setOpenPanel(null)}
                className="flex items-center gap-3 rounded-lg p-3 shadow-sm ring-1 ring-[#3e4042] hover:bg-[#3a3b3c]"
              >
                <Image
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Shoubail Akhtar"
                  width={52}
                  height={52}
                  unoptimized
                  className="rounded-full"
                />
                <div>
                  <p className="font-bold text-white">Shoubail Akhtar</p>
                  <p className="mt-1 text-sm text-[#b0b3b8]">
                    See your profile
                  </p>
                </div>
              </Link>
              <Link
                href="/profile"
                onClick={() => setOpenPanel(null)}
                className="mt-2 block rounded-lg px-3 py-3 font-semibold text-gray-200 hover:bg-[#3a3b3c]"
              >
                Settings &amp; privacy
              </Link>
              <button className="block w-full rounded-lg px-3 py-3 text-left font-semibold text-gray-200 hover:bg-[#3a3b3c]">
                Help &amp; support
              </button>
              <button className="block w-full rounded-lg px-3 py-3 text-left font-semibold text-gray-200 hover:bg-[#3a3b3c]">
                Display &amp; accessibility
              </button>
            </div>
          ) : (
            <>
              <h2 className="px-2 py-1 text-xl font-bold text-white">
                {openPanel === "menu" ? "Menu" : "Notifications"}
              </h2>
              {openPanel === "menu" ? (
                [
                  ["Friends", "/friends"],
                  ["Groups", "/groups"],
                  ["Marketplace", "/marketplace"],
                  ["Events", "/events"],
                  ["Saved", "/saved"],
                ].map(([label, href]) => (
                  <Link
                    key={label}
                    href={href}
                    onClick={() => setOpenPanel(null)}
                    className="block rounded-lg px-3 py-3 text-gray-200 hover:bg-[#3a3b3c]"
                  >
                    {label}
                  </Link>
                ))
              ) : (
                <div className="rounded-lg px-3 py-4 text-sm text-gray-300 hover:bg-[#3a3b3c]">
                  Burhan Khan sent you a friend request.
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
