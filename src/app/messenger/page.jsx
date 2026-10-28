"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Edit3, Info, Menu, MessageCircle, MoreHorizontal, Phone, Plus, Search, Send, Smile, Video } from "lucide-react";

const initialChats = [
  { id: 1, name: "Ayesha Khan", avatar: 13, preview: "See you tomorrow!", time: "2m", unread: 2, online: true, messages: [{ from: "them", text: "Are we still meeting tomorrow?" }, { from: "me", text: "Yes, around 6." }, { from: "them", text: "Perfect! See you tomorrow!" }] },
  { id: 2, name: "Burhan Khan", avatar: 12, preview: "That photo looks great", time: "18m", unread: 0, online: true, messages: [{ from: "them", text: "I uploaded the photos." }, { from: "me", text: "That photo looks great" }] },
  { id: 3, name: "Family Group", avatar: 48, preview: "Sara: Dinner at 8", time: "1h", unread: 5, online: false, messages: [{ from: "them", text: "Sara: Dinner at 8 tonight" }, { from: "me", text: "I'll be there!" }] },
  { id: 4, name: "Hamza Ali", avatar: 14, preview: "You sent a photo", time: "3h", unread: 0, online: false, messages: [{ from: "me", text: "You sent a photo" }] },
  { id: 5, name: "Sara Ahmed", avatar: 15, preview: "Sounds like a plan", time: "Yesterday", unread: 0, online: true, messages: [{ from: "them", text: "Let's plan the trip this weekend" }, { from: "them", text: "Sounds like a plan" }] },
];

const people = [
  { name: "Ayesha Khan", avatar: 13 }, { name: "Burhan Khan", avatar: 12 }, { name: "Hamza Ali", avatar: 14 }, { name: "Sara Ahmed", avatar: 15 }, { name: "Usman Malik", avatar: 16 }, { name: "Zara Noor", avatar: 17 },
];

export default function MessengerPage() {
  const [chats, setChats] = useState(initialChats);
  const [activeId, setActiveId] = useState(1);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [mobileChat, setMobileChat] = useState(false);
  const [newChat, setNewChat] = useState(false);
  const active = chats.find((chat) => chat.id === activeId) || chats[0];
  const filtered = chats.filter((chat) => chat.name.toLowerCase().includes(query.toLowerCase()));
  const peopleFiltered = useMemo(() => people.filter((person) => person.name.toLowerCase().includes(query.toLowerCase())), [query]);

  function selectChat(chat) {
    setActiveId(chat.id);
    setMobileChat(true);
    setChats((current) => current.map((item) => item.id === chat.id ? { ...item, unread: 0 } : item));
  }

  function sendMessage(event) {
    event.preventDefault();
    const text = message.trim();
    if (!text) return;
    setChats((current) => current.map((chat) => chat.id === activeId ? { ...chat, preview: `You: ${text}`, time: "Now", messages: [...chat.messages, { from: "me", text }] } : chat));
    setMessage("");
  }

  function startChat(person) {
    const existing = chats.find((chat) => chat.name === person.name);
    if (existing) selectChat(existing);
    else {
      const chat = { id: Date.now(), name: person.name, avatar: person.avatar, preview: "New conversation", time: "Now", unread: 0, online: true, messages: [] };
      setChats((current) => [chat, ...current]);
      setActiveId(chat.id);
    }
    setNewChat(false);
  }

  return (
    <main className="fixed inset-x-0 bottom-0 top-14 bg-[#18191a] lg:left-[360px] lg:right-[360px] xl:left-[360px] xl:right-[360px]">
      <div className="mx-auto flex h-full max-w-[1200px] overflow-hidden bg-[#242526] text-white xl:rounded-t-lg xl:border-x xl:border-[#3e4042]">
        <section className={`${mobileChat ? "hidden md:flex" : "flex"} w-full shrink-0 flex-col border-r border-[#3e4042] md:w-[340px]`}>
          <header className="flex items-center justify-between px-4 pb-2 pt-4"><h1 className="text-2xl font-bold">Chats</h1><div className="flex gap-1"><button className="rounded-full p-2 hover:bg-[#3a3b3c]" aria-label="Messenger menu"><Menu size={20} /></button><button onClick={() => setNewChat(true)} className="rounded-full bg-[#3a3b3c] p-2 hover:bg-[#4e4f50]" aria-label="New message"><Edit3 size={20} /></button></div></header>
          <label className="mx-3 mt-2 flex h-10 items-center rounded-full bg-[#3a3b3c] px-3"><Search size={18} className="text-[#b0b3b8]" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Messenger" className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none" /></label>
          <div className="flex gap-2 px-3 py-3"><button className="rounded-full bg-[#263951] px-4 py-1.5 text-sm font-semibold text-[#70a7ff]">Inbox</button><button className="rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-[#3a3b3c]">Communities</button></div>
          <div className="flex-1 overflow-y-auto px-2 pb-3">
            {filtered.map((chat) => <button key={chat.id} onClick={() => selectChat(chat)} className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-[#3a3b3c] ${activeId === chat.id ? "bg-[#263951]" : ""}`}><div className="relative h-14 w-14 shrink-0"><Image src={`https://i.pravatar.cc/150?img=${chat.avatar}`} alt="" width={56} height={56} unoptimized className="h-full w-full rounded-full object-cover" />{chat.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#242526] bg-green-500" />}</div><div className="min-w-0 flex-1"><p className="truncate font-semibold">{chat.name}</p><p className={`truncate text-sm ${chat.unread ? "font-semibold text-white" : "text-[#b0b3b8]"}`}>{chat.preview} · {chat.time}</p></div>{chat.unread > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0866ff] px-1 text-xs font-bold">{chat.unread}</span>}</button>)}
          </div>
        </section>

        <section className={`${mobileChat ? "flex" : "hidden md:flex"} min-w-0 flex-1 flex-col bg-[#18191a]`}>
          {active && <><header className="flex h-16 items-center gap-3 border-b border-[#3e4042] bg-[#242526] px-3"><button onClick={() => setMobileChat(false)} className="rounded-full p-2 md:hidden" aria-label="Back to chats">←</button><div className="relative h-10 w-10 shrink-0"><Image src={`https://i.pravatar.cc/150?img=${active.avatar}`} alt="" width={40} height={40} unoptimized className="h-full w-full rounded-full object-cover" />{active.online && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#242526] bg-green-500" />}</div><div className="min-w-0 flex-1"><p className="font-semibold">{active.name}</p><p className="text-xs text-[#31a24c]">{active.online ? "Active now" : "Last active recently"}</p></div><div className="flex text-[#2e89ff]"><button className="rounded-full p-2 hover:bg-[#3a3b3c]" aria-label="Start audio call"><Phone size={20} /></button><button className="rounded-full p-2 hover:bg-[#3a3b3c]" aria-label="Start video call"><Video size={20} /></button><button className="hidden rounded-full p-2 hover:bg-[#3a3b3c] sm:block" aria-label="Conversation info"><Info size={20} /></button></div></header>
          <div className="flex-1 overflow-y-auto px-4 py-5"><div className="mb-6 text-center"><Image src={`https://i.pravatar.cc/150?img=${active.avatar}`} alt="" width={72} height={72} unoptimized className="mx-auto rounded-full" /><p className="mt-2 font-bold">{active.name}</p><p className="text-xs text-[#b0b3b8]">Facebook</p></div>{active.messages.map((item, index) => <div key={index} className={`mb-2 flex ${item.from === "me" ? "justify-end" : "justify-start"}`}><div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${item.from === "me" ? "bg-[#0866ff] text-white" : "bg-[#3a3b3c]"}`}>{item.text}</div></div>)}{!active.messages.length && <div className="py-16 text-center text-[#b0b3b8]"><MessageCircle className="mx-auto mb-2" /><p>Say hello to {active.name}</p></div>}</div>
          <form onSubmit={sendMessage} className="flex items-center gap-1 border-t border-[#3e4042] bg-[#242526] p-2"><button type="button" className="rounded-full p-2 text-[#2e89ff]" aria-label="Add attachment"><Plus size={21} /></button><input value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Aa" className="h-10 min-w-0 flex-1 rounded-full bg-[#3a3b3c] px-4 text-sm outline-none" /><button type="button" className="rounded-full p-2 text-[#2e89ff]" aria-label="Choose emoji"><Smile size={20} /></button>{message.trim() ? <button className="rounded-full p-2 text-[#2e89ff]" aria-label="Send message"><Send size={20} /></button> : <button type="button" className="rounded-full p-2 text-[#2e89ff]" aria-label="Send like"><span className="text-xl">👍</span></button>}</form></>}
        </section>
      </div>

      {newChat && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true"><div className="flex max-h-[80vh] w-full max-w-md flex-col rounded-xl bg-[#242526] text-white shadow-2xl"><header className="flex items-center justify-between border-b border-[#3e4042] px-4 py-3"><h2 className="text-xl font-bold">New message</h2><button onClick={() => setNewChat(false)} className="rounded-full p-2 hover:bg-[#3a3b3c]" aria-label="Close">×</button></header><div className="flex items-center border-b border-[#3e4042] px-4"><span className="font-semibold">To:</span><input value={query} onChange={(event) => setQuery(event.target.value)} autoFocus placeholder="Type a name" className="h-12 min-w-0 flex-1 bg-transparent px-3 outline-none" /></div><div className="overflow-y-auto p-2">{peopleFiltered.map((person) => <button key={person.name} onClick={() => startChat(person)} className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-[#3a3b3c]"><Image src={`https://i.pravatar.cc/150?img=${person.avatar}`} alt="" width={44} height={44} unoptimized className="rounded-full" /><div><p className="font-semibold">{person.name}</p><p className="text-xs text-[#b0b3b8]">Active now</p></div></button>)}</div></div></div>}
    </main>
  );
}
