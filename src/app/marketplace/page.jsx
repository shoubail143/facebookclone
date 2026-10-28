"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronDown, MapPin, Search, SlidersHorizontal, Store } from "lucide-react";

const listings = [
  { id: 1, title: "Modern black office chair", price: "$85", location: "New York, NY", category: "Furniture", image: "photo-1598300056393-4aac492f4344" },
  { id: 2, title: "Apple iPhone 15 Pro", price: "$699", location: "Brooklyn, NY", category: "Electronics", image: "photo-1695048133142-1a20484d2569" },
  { id: 3, title: "Mountain bike", price: "$420", location: "Queens, NY", category: "Vehicles", image: "photo-1558981806-ec527fa84c39" },
  { id: 4, title: "Minimal wooden desk", price: "$150", location: "Jersey City, NJ", category: "Furniture", image: "photo-1518455027359-f3f8164ba6bd" },
  { id: 5, title: "Sony wireless headphones", price: "$110", location: "Manhattan, NY", category: "Electronics", image: "photo-1505740420928-5e560c06d30e" },
  { id: 6, title: "Nike running shoes", price: "$65", location: "Bronx, NY", category: "Clothing", image: "photo-1542291026-7eec264c27ff" },
];

export default function MarketplacePage() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const visibleListings = listings.filter((item) => (category === "All" || item.category === category) && item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#18191a] lg:ml-[360px] xl:mr-[360px]">
      <div className="mx-auto flex max-w-[1040px] flex-col p-3 sm:p-5">
        <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#3e4042] pb-4">
          <div><h1 className="text-2xl font-bold text-white sm:text-3xl">Marketplace</h1><p className="mt-1 text-sm text-[#b0b3b8]">Buy and sell items near you</p></div>
          <button className="rounded-md bg-[#0866ff] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1877f2]">+ Create new listing</button>
        </header>

        <div className="grid gap-5 md:grid-cols-[220px_1fr]">
          <aside className="hidden md:block">
            <label className="flex h-10 items-center rounded-full bg-[#3a3b3c] px-3"><Search size={18} className="text-[#b0b3b8]" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Marketplace" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none" /></label>
            <div className="mt-4 space-y-1">
              {["All", "Electronics", "Furniture", "Vehicles", "Clothing"].map((name) => <button key={name} onClick={() => setCategory(name)} className={`flex h-10 w-full items-center gap-3 rounded-lg px-3 text-left text-sm font-semibold ${category === name ? "bg-[#263951] text-[#2e89ff]" : "text-[#e4e6eb] hover:bg-[#242526]"}`}><Store size={18} />{name}</button>)}
            </div>
            <button className="mt-5 h-9 w-full rounded-md bg-[#3a3b3c] text-sm font-semibold text-white">Filters</button>
          </aside>

          <section>
            <div className="mb-3 flex gap-2 md:hidden"><label className="flex h-10 flex-1 items-center rounded-full bg-[#3a3b3c] px-3"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search Marketplace" className="min-w-0 flex-1 bg-transparent px-2 text-sm text-white outline-none" /></label><button aria-label="Filters" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3a3b3c] text-white"><SlidersHorizontal size={18} /></button></div>
            <div className="mb-4 flex items-center gap-2 overflow-x-auto text-white md:hidden">{["All", "Electronics", "Furniture", "Vehicles"].map((name) => <button key={name} onClick={() => setCategory(name)} className={`shrink-0 rounded-full px-4 py-2 text-sm ${category === name ? "bg-[#263951] text-[#2e89ff]" : "bg-[#242526]"}`}>{name}</button>)}</div>
            <h2 className="mb-3 flex items-center gap-1 text-lg font-bold text-white">Today&apos;s picks <ChevronDown size={18} /></h2>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {visibleListings.map((item) => <article key={item.id} className="min-w-0 cursor-pointer rounded-lg text-[#e4e6eb]">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-[#242526]"><Image src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=500&q=80`} alt={item.title} fill sizes="250px" className="object-cover transition-transform hover:scale-105" /></div>
                <p className="mt-2 font-bold">{item.price}</p><p className="truncate text-sm">{item.title}</p><p className="mt-1 flex items-center gap-1 text-xs text-[#b0b3b8]"><MapPin size={12} />{item.location}</p>
              </article>)}
            </div>
            {!visibleListings.length && <p className="py-16 text-center text-[#b0b3b8]">No listings match your search.</p>}
          </section>
        </div>
      </div>
    </main>
  );
}
