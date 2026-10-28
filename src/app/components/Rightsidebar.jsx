"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Edit3, MoreHorizontal, Search, Send, Video, X } from "lucide-react";

const contacts = [
  { name: "Shoubail Akhtar", avatar: 11 },
  { name: "Burhan Khan", avatar: 12 },
  { name: "Ayesha Khan", avatar: 13 },
  { name: "Hamza Ali", avatar: 14 },
  { name: "Sara Ahmed", avatar: 15 },
  { name: "Usman Malik", avatar: 16 },
  { name: "Zara Noor", avatar: 17 },
  { name: "Ali Hassan", avatar: 18 },
];

const ads = [
  { title: "Travel with ease", detail: "Explore new places with exclusive holiday deals.", site: "wanderly.com", image: "photo-1507525428034-b723cf961d3e", colour: "from-cyan-500 to-blue-700" },
  { title: "Power your setup", detail: "Shop accessories designed for work and play.", site: "techhaven.store", image: "photo-1496181133206-80ce9b88a853", colour: "from-slate-600 to-slate-900" },
];

const initialRequests = [
  { id: 1, name: "Burhan Khan", avatar: 12, mutual: "1 mutual friend", time: "1w" },
  { id: 2, name: "Sana Malik", avatar: 47, mutual: "4 mutual friends", time: "2d" },
  { id: 3, name: "Omar Farooq", avatar: 33, mutual: "6 mutual friends", time: "3d" },
];

export default function RightSidebar() {
  const [requests, setRequests] = useState(initialRequests);
  const [hiddenAds, setHiddenAds] = useState([]);
  const [contactQuery, setContactQuery] = useState("");
  const [showContactSearch, setShowContactSearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState([]);

  const filteredContacts = contacts.filter((person) => person.name.toLowerCase().includes(contactQuery.toLowerCase()));

  function handleRequest(id, action) {
    setRequests((current) => current.filter((request) => request.id !== id));
    if (action === "confirm") setSentMessages((current) => [...current, { id: Date.now(), text: "You are now friends" }]);
  }

  const sidebar = (
    <aside className="h-full w-full overflow-y-auto bg-[#242526] px-3 py-3 text-[#e4e6eb] xl:w-[360px] xl:border-l xl:border-[#3e4042]">
      <section className="pb-4">
        <h2 className="px-2 text-[22px] font-bold leading-8 tracking-tight">Sponsored</h2>

        {ads.filter((ad) => !hiddenAds.includes(ad.title)).map((ad) => (
          <Link href="/marketplace" key={ad.title} className="group block rounded-lg px-1 py-2 hover:bg-[#3a3b3c]">
            <div className="flex items-center gap-3">
              <div className={`relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br ${ad.colour}`}>
                <Image src={`https://images.unsplash.com/${ad.image}?auto=format&fit=crop&w=300&q=80`} alt="" fill sizes="112px" className="object-cover transition group-hover:scale-105" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-tight">{ad.title}</p>
                <p className="mt-1 text-xs text-[#b0b3b8]">{ad.detail}</p>
                <p className="mt-1 text-xs text-[#b0b3b8]">{ad.site}</p>
              </div>
            </div>
            <button type="button" onClick={(event) => { event.preventDefault(); setHiddenAds((current) => [...current, ad.title]); }} className="mt-2 rounded-full px-2 py-1 text-xs text-[#b0b3b8] hover:bg-[#4e4f50]">Hide ad</button>
          </Link>
        ))}
      </section>

      <div className="my-5 h-px bg-[#d9dce0]" />

      <section>
        <div className="mb-3 flex items-center justify-between px-2">
          <h3 className="text-[22px] font-bold leading-8">Friend requests</h3>
          <Link href="/friends" className="text-[15px] font-semibold text-[#1877f2] hover:underline">
            See all
          </Link>
        </div>

        {requests.length ? requests.slice(0, 2).map((request) => (
          <div key={request.id} className="mb-3 rounded-lg px-2 py-3 hover:bg-[#303132]">
            <div className="flex gap-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full"><Image src={`https://i.pravatar.cc/150?img=${request.avatar}`} alt={request.name} fill sizes="56px" unoptimized className="object-cover" /></div>
              <div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><p className="font-semibold">{request.name}</p><span className="text-xs text-[#b0b3b8]">{request.time}</span></div><p className="mt-1 text-xs text-[#b0b3b8]">{request.mutual}</p></div>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2"><button onClick={() => handleRequest(request.id, "confirm")} className="h-8 rounded-md bg-[#0866ff] text-sm font-semibold text-white hover:bg-[#1877f2]">Confirm</button><button onClick={() => handleRequest(request.id, "delete")} className="h-8 rounded-md bg-[#3a3b3c] text-sm font-semibold text-white hover:bg-[#4e4f50]">Delete</button></div>
          </div>
        )) : <p className="px-2 py-4 text-sm text-[#b0b3b8]">No new friend requests.</p>}
      </section>

      <div className="my-5 h-px bg-[#d9dce0]" />

      <section>
        <div className="mb-3 flex items-center justify-between px-2">
          <h3 className="text-[22px] font-bold leading-8">Contacts</h3>
          <div className="flex items-center gap-1 text-[#b0b3b8]">
            <button onClick={() => setShowContactSearch((current) => !current)} aria-label="Search contacts" className="rounded-full p-2 transition hover:bg-[#3a3b3c]"><Search size={18} /></button>
            <button aria-label="Contact options" className="rounded-full p-2 transition hover:bg-[#3a3b3c]"><MoreHorizontal size={18} /></button>
          </div>
        </div>
        {showContactSearch && <div className="mb-2 flex items-center rounded-full bg-[#3a3b3c] px-3"><Search size={16} /><input value={contactQuery} onChange={(event) => setContactQuery(event.target.value)} autoFocus placeholder="Search contacts" className="h-8 min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" /></div>}

        <div className="space-y-1">
          {filteredContacts.map((person) => (
            <button key={person.name} onClick={() => setChat(person)} className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition hover:bg-[#3a3b3c]">
              <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#3a3b3c]">
                <Image src={`https://i.pravatar.cc/150?img=${person.avatar}`} alt={person.name} width={40} height={40} unoptimized className="h-full w-full object-cover" />
                <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-[2px] border-[#242526] bg-[#31a24c]" />
              </span>
              <span className="min-w-0 flex-1 text-[15px] font-medium">{person.name}</span>
              <span className="h-2 w-2 rounded-full bg-green-500" />
            </button>
          ))}
          {!filteredContacts.length && <p className="px-2 py-4 text-sm text-[#b0b3b8]">No contacts found.</p>}
        </div>
      </section>

    </aside>
  );

  return (
    <>
      <div className="fixed right-0 top-14 hidden h-[calc(100vh-56px)] w-[360px] xl:block">{sidebar}</div>
      <button aria-label="Open contacts" onClick={() => setDrawerOpen(true)} className="fixed bottom-20 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#242526] text-white shadow-xl xl:hidden"><Edit3 size={22} /></button>
      {drawerOpen && <div className="fixed inset-0 z-[80] xl:hidden" role="dialog" aria-modal="true"><button aria-label="Close contacts" onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-black/60" /><div className="absolute bottom-0 right-0 top-14 w-full max-w-[360px] shadow-2xl">{sidebar}<button onClick={() => setDrawerOpen(false)} className="absolute right-3 top-3 rounded-full bg-[#3a3b3c] p-2" aria-label="Close"><X size={18} /></button></div></div>}

      {chat && (
        <div className="fixed bottom-0 right-4 z-[90] w-[calc(100vw-32px)] max-w-[330px] overflow-hidden rounded-t-lg bg-[#242526] text-white shadow-2xl xl:right-[370px]">
          <header className="flex items-center gap-2 border-b border-[#3e4042] px-3 py-2"><Image src={`https://i.pravatar.cc/150?img=${chat.avatar}`} alt="" width={32} height={32} unoptimized className="rounded-full" /><div className="min-w-0 flex-1"><p className="text-sm font-semibold">{chat.name}</p><p className="text-xs text-[#31a24c]">Active now</p></div><button aria-label="Start video call" className="rounded-full p-2 hover:bg-[#3a3b3c]"><Video size={18} /></button><button onClick={() => setChat(null)} aria-label="Close chat" className="rounded-full p-2 hover:bg-[#3a3b3c]"><X size={18} /></button></header>
          <div className="h-52 overflow-y-auto p-3 text-sm"><div className="ml-auto mb-2 w-fit max-w-[80%] rounded-2xl bg-[#0866ff] px-3 py-2">Hi! 😊</div>{sentMessages.map((sent) => <div key={sent.id} className="ml-auto mb-2 max-w-[80%] rounded-2xl bg-[#0866ff] px-3 py-2">{sent.text}</div>)}</div>
          <form onSubmit={(event) => { event.preventDefault(); if (!message.trim()) return; setSentMessages((current) => [...current, { id: Date.now(), text: message.trim() }]); setMessage(""); }} className="flex items-center gap-2 border-t border-[#3e4042] p-2"><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Aa" className="h-9 min-w-0 flex-1 rounded-full bg-[#3a3b3c] px-3 text-sm outline-none" /><button aria-label="Send message" className="rounded-full p-2 text-[#2e89ff]"><Send size={18} /></button></form>
        </div>
      )}
      <button onClick={() => setChat(filteredContacts[0] || contacts[0])} aria-label="New message" className="fixed bottom-5 right-5 hidden h-12 w-12 items-center justify-center rounded-full bg-[#242526] text-white shadow-[0_10px_25px_rgba(0,0,0,0.35)] transition hover:scale-105 xl:flex"><Edit3 size={22} /></button>
    </>
  );
}
