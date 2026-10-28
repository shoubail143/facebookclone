"use client";

import Image from "next/image";
import { useState } from "react";
import { Gamepad2, Play, Search, Tv } from "lucide-react";

const games = [
  { id: 1, title: "Galaxy Riders", genre: "Action", players: "12K playing", image: "photo-1511512578047-dfb367046420" },
  { id: 2, title: "City Legends", genre: "Adventure", players: "8.4K playing", image: "photo-1550745165-9bc0b252726f" },
  { id: 3, title: "Speed Circuit", genre: "Racing", players: "21K playing", image: "photo-1538481199705-c710c4e965fc" },
  { id: 4, title: "Dragon Quest", genre: "Fantasy", players: "16K playing", image: "photo-1493711662062-fa541adb3fc8" },
  { id: 5, title: "World Builder", genre: "Strategy", players: "5K playing", image: "photo-1598550476439-6847785fcea6" },
  { id: 6, title: "Battle Arena", genre: "Multiplayer", players: "31K playing", image: "photo-1542751371-adc38448a05e" },
];

export default function GamingPage() {
  const [tab, setTab] = useState("For you");
  const [query, setQuery] = useState("");
  const filtered = games.filter((game) => game.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#18191a] lg:ml-[360px] xl:mr-[360px]">
      <div className="mx-auto max-w-[1040px] p-3 sm:p-5">
        <header><h1 className="text-2xl font-bold text-white sm:text-3xl">Gaming</h1><p className="mt-1 text-sm text-[#b0b3b8]">Play games and watch gaming videos</p></header>
        <div className="mt-4 flex gap-2 overflow-x-auto border-b border-[#3e4042] pb-2">
          {["For you", "Instant games", "Live play", "Saved"].map((name) => <button key={name} onClick={() => setTab(name)} className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${tab === name ? "bg-[#263951] text-[#2e89ff]" : "text-[#e4e6eb] hover:bg-[#242526]"}`}>{name}</button>)}
        </div>
        <label className="mt-4 flex h-10 items-center rounded-full bg-[#242526] px-3 sm:max-w-sm"><Search size={18} className="text-[#b0b3b8]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search games" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none" /></label>

        {tab === "Live play" ? (
          <section className="mt-5"><h2 className="mb-3 flex items-center gap-2 text-xl font-bold text-white"><Tv className="text-red-500" />Live now</h2><div className="grid gap-3 sm:grid-cols-2">{filtered.slice(0, 4).map((game) => <article key={game.id} className="overflow-hidden rounded-lg bg-[#242526]"><div className="relative aspect-video"><Image src={`https://images.unsplash.com/${game.image}?auto=format&fit=crop&w=800&q=80`} alt={game.title} fill sizes="500px" className="object-cover" /><span className="absolute left-3 top-3 rounded bg-red-600 px-2 py-1 text-xs font-bold text-white">LIVE</span><button className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-white"><Play fill="currentColor" /></button></div><div className="p-3"><h3 className="font-semibold text-white">{game.title}</h3><p className="text-sm text-[#b0b3b8]">{game.players} watching</p></div></article>)}</div></section>
        ) : (
          <section className="mt-5"><h2 className="mb-3 text-xl font-bold text-white">{tab === "Saved" ? "Saved games" : "Recommended for you"}</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{filtered.map((game) => <article key={game.id} className="overflow-hidden rounded-lg bg-[#242526] text-white"><div className="relative aspect-[4/3]"><Image src={`https://images.unsplash.com/${game.image}?auto=format&fit=crop&w=500&q=80`} alt={game.title} fill sizes="250px" className="object-cover" /></div><div className="p-3"><h3 className="truncate font-semibold">{game.title}</h3><p className="mt-1 text-xs text-[#b0b3b8]">{game.genre} · {game.players}</p><button className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-md bg-[#263951] text-sm font-semibold text-[#2e89ff] hover:bg-[#2d405c]"><Gamepad2 size={18} />Play</button></div></article>)}</div></section>
        )}
      </div>
    </main>
  );
}
