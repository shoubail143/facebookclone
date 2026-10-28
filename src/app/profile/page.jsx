"use client";

import Image from "next/image";
import { useState } from "react";
import { Camera, Edit3, Grid3X3, MapPin, MoreHorizontal, Plus, Users } from "lucide-react";

const photos = [
  "photo-1501785888041-af3ef285b470", "photo-1500534314209-a25ddb2bd429", "photo-1470770841072-f978cf4d019e",
  "photo-1519501025264-65ba15a82390", "photo-1500530855697-b586d89ba3ee", "photo-1511818966892-d7d671e672a2",
];

export default function ProfilePage() {
  const [tab, setTab] = useState("Posts");
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("Learning, building and sharing the journey.");
  const [draft, setDraft] = useState(bio);
  const [following, setFollowing] = useState(false);

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#18191a] lg:ml-[360px] xl:mr-[360px]">
      <div className="mx-auto max-w-[940px] bg-[#242526] pb-4 shadow-sm">
        <section className="relative px-2 sm:px-5">
          <div className="relative h-52 overflow-hidden rounded-b-xl bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 sm:h-72">
            <Image src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=85" alt="Profile cover" fill priority sizes="940px" className="object-cover opacity-75" />
            <button className="absolute bottom-3 right-3 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#1c1e21] shadow"><Camera size={18} /><span className="hidden sm:inline">Edit cover photo</span></button>
          </div>
          <div className="relative z-10 mx-1 flex flex-col items-center border-b border-[#3e4042] pb-4 sm:mx-5 sm:flex-row sm:items-end">
            <div className="-mt-16 h-32 w-32 rounded-full border-4 border-[#242526] bg-[#3a3b3c] sm:-mt-8 sm:h-40 sm:w-40">
              <Image src="https://i.pravatar.cc/300?img=11" alt="Shoubail Akhtar" width={160} height={160} unoptimized className="h-full w-full rounded-full object-cover" />
            </div>
            <button className="absolute bottom-[58px] left-[118px] rounded-full border-4 border-[#242526] bg-[#3a3b3c] p-1.5 text-white sm:bottom-5 sm:left-[150px]"><Camera size={18} /></button>
            <div className="min-w-0 flex-1 pt-3 text-center sm:pb-2 sm:pl-5 sm:text-left"><h1 className="text-3xl font-bold text-white">Shoubail Akhtar</h1><button className="mt-1 text-sm font-semibold text-[#b0b3b8] hover:underline">1.2K friends</button><div className="mt-3 flex justify-center -space-x-2 sm:justify-start">{[12,13,14,15,16].map((id) => <Image key={id} src={`https://i.pravatar.cc/50?img=${id}`} alt="" width={30} height={30} unoptimized className="rounded-full border-2 border-[#242526]" />)}</div></div>
            <div className="mt-4 flex gap-2 sm:mb-2 sm:mt-0"><button onClick={() => setFollowing((current) => !current)} className="flex h-9 items-center gap-2 rounded-md bg-[#0866ff] px-4 text-sm font-semibold text-white"><Plus size={18} />{following ? "Following" : "Add to story"}</button><button onClick={() => setEditing(true)} className="flex h-9 items-center gap-2 rounded-md bg-[#3a3b3c] px-4 text-sm font-semibold text-white hover:bg-[#4e4f50]"><Edit3 size={17} />Edit profile</button></div>
          </div>
        </section>
        <nav className="flex overflow-x-auto px-2 sm:px-5">{["Posts", "About", "Friends", "Photos", "Videos"].map((name) => <button key={name} onClick={() => setTab(name)} className={`relative h-12 shrink-0 px-4 font-semibold ${tab === name ? "text-[#2e89ff]" : "text-[#b0b3b8] hover:bg-[#3a3b3c]"}`}>{name}{tab === name && <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded bg-[#2e89ff]" />}</button>)}<button aria-label="More profile tabs" className="rounded-md px-3 text-[#b0b3b8] hover:bg-[#3a3b3c]"><MoreHorizontal /></button></nav>
      </div>

      <div className="mx-auto grid max-w-[940px] gap-4 px-2 py-4 lg:grid-cols-[360px_1fr] sm:px-3">
        <aside className="space-y-4">
          <section className="rounded-lg bg-[#242526] p-4"><h2 className="text-xl font-bold text-white">Intro</h2><p className="my-4 text-center text-sm text-[#e4e6eb]">{bio}</p><button onClick={() => setEditing(true)} className="h-9 w-full rounded-md bg-[#3a3b3c] text-sm font-semibold text-white hover:bg-[#4e4f50]">Edit bio</button><div className="mt-4 space-y-3 text-sm text-[#b0b3b8]"><p className="flex items-center gap-2"><MapPin size={18} />Lives in Islamabad, Pakistan</p><p className="flex items-center gap-2"><Users size={18} />Followed by 840 people</p></div></section>
          <section className="rounded-lg bg-[#242526] p-4"><div className="mb-3 flex items-center justify-between"><h2 className="text-xl font-bold text-white">Photos</h2><button onClick={() => setTab("Photos")} className="text-sm text-[#2e89ff]">See all photos</button></div><div className="grid grid-cols-3 gap-1 overflow-hidden rounded-lg">{photos.slice(0, 9).map((photo) => <div key={photo} className="relative aspect-square"><Image src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=250&q=80`} alt="Profile photo" fill sizes="100px" className="object-cover" /></div>)}</div></section>
        </aside>
        <section className="min-w-0 rounded-lg bg-[#242526] p-4">
          <div className="flex items-center gap-3 border-b border-[#3e4042] pb-3"><Image src="https://i.pravatar.cc/100?img=11" alt="" width={40} height={40} unoptimized className="rounded-full" /><button className="h-10 flex-1 rounded-full bg-[#3a3b3c] px-4 text-left text-[#b0b3b8] hover:bg-[#4e4f50]">What&apos;s on your mind?</button></div>
          <h2 className="my-4 text-xl font-bold text-white">{tab}</h2>
          {tab === "Photos" ? <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{photos.map((photo) => <div key={photo} className="relative aspect-square overflow-hidden rounded-lg"><Image src={`https://images.unsplash.com/${photo}?auto=format&fit=crop&w=400&q=80`} alt="" fill sizes="200px" className="object-cover" /></div>)}</div> : <div className="py-10 text-center text-[#b0b3b8]"><Grid3X3 className="mx-auto mb-3" /><p>No {tab.toLowerCase()} items to show yet.</p></div>}
        </section>
      </div>

      {editing && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4" role="dialog" aria-modal="true"><div className="w-full max-w-md rounded-xl bg-[#242526] p-5 text-white"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Edit bio</h2><button onClick={() => setEditing(false)}>×</button></div><textarea value={draft} onChange={(event) => setDraft(event.target.value)} maxLength={101} className="mt-4 h-28 w-full resize-none rounded-lg bg-[#3a3b3c] p-3 outline-none" /><p className="mt-1 text-right text-xs text-[#b0b3b8]">{101 - draft.length} characters remaining</p><button onClick={() => { setBio(draft.trim() || bio); setEditing(false); }} className="mt-4 h-10 w-full rounded-md bg-[#0866ff] font-semibold">Save</button></div></div>}
    </main>
  );
}
