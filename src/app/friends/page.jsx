"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, UserPlus, Users } from "lucide-react";

const people = [
  { id: 1, name: "Burhan Khan", mutual: 3, image: 12 }, { id: 2, name: "Ayesha Khan", mutual: 8, image: 13 },
  { id: 3, name: "Hamza Ali", mutual: 1, image: 14 }, { id: 4, name: "Sara Ahmed", mutual: 5, image: 15 },
  { id: 5, name: "Usman Malik", mutual: 12, image: 16 }, { id: 6, name: "Zara Noor", mutual: 2, image: 17 },
];

export default function FriendsPage() {
  const [tab, setTab] = useState("Suggestions");
  const [removed, setRemoved] = useState([]);
  const [added, setAdded] = useState([]);
  const visible = people.filter((person) => !removed.includes(person.id) && !(tab === "Requests" && !added.includes(person.id)));

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#18191a] lg:ml-[360px] xl:mr-[360px]">
      <div className="mx-auto max-w-[1040px] p-3 sm:p-5">
        <header className="mb-4"><h1 className="text-2xl font-bold text-white sm:text-3xl">Friends</h1></header>
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {["Suggestions", "Requests", "All friends"].map((name) => <button key={name} onClick={() => setTab(name)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${tab === name ? "bg-[#263951] text-[#2e89ff]" : "bg-[#242526] text-white hover:bg-[#3a3b3c]"}`}>{name}</button>)}
        </div>
        <div className="mb-5 flex h-10 items-center rounded-full bg-[#242526] px-3 lg:hidden"><Search size={18} className="text-[#b0b3b8]" /><input placeholder="Search friends" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none" /></div>
        <section>
          <div className="mb-3 flex items-center justify-between"><h2 className="text-xl font-bold text-white">{tab === "Suggestions" ? "People you may know" : tab}</h2><button className="text-sm font-semibold text-[#2e89ff]">See all</button></div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((person) => <article key={person.id} className="overflow-hidden rounded-lg bg-[#242526] shadow-sm">
              <div className="relative aspect-[4/3] bg-[#3a3b3c]"><Image src={`https://i.pravatar.cc/600?img=${person.image}`} alt={person.name} fill sizes="300px" unoptimized className="object-cover" /></div>
              <div className="p-3"><h3 className="font-semibold text-[#e4e6eb]">{person.name}</h3><p className="mt-1 text-sm text-[#b0b3b8]">{person.mutual} mutual friends</p>
                <button onClick={() => setAdded((current) => [...current, person.id])} className="mt-3 h-9 w-full rounded-md bg-[#263951] text-sm font-semibold text-[#70a7ff] hover:bg-[#2d405c]">{added.includes(person.id) ? "Request sent" : <span className="flex items-center justify-center gap-2"><UserPlus size={17} />Add friend</span>}</button>
                <button onClick={() => setRemoved((current) => [...current, person.id])} className="mt-2 h-9 w-full rounded-md bg-[#3a3b3c] text-sm font-semibold text-white hover:bg-[#4e4f50]">Remove</button>
              </div>
            </article>)}
          </div>
          {!visible.length && <div className="py-20 text-center text-[#b0b3b8]"><Users className="mx-auto mb-3" /><p>No friend activity here yet.</p></div>}
        </section>
      </div>
    </main>
  );
}
