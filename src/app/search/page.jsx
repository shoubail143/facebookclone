import Image from "next/image";
import Link from "next/link";

const people = [
  { name: "Ayesha Khan", detail: "8 mutual friends", image: 13, href: "/friends" },
  { name: "Burhan Khan", detail: "3 mutual friends", image: 12, href: "/friends" },
  { name: "Hamza Ali", detail: "1 mutual friend", image: 14, href: "/friends" },
  { name: "Sara Ahmed", detail: "5 mutual friends", image: 15, href: "/friends" },
];

const destinations = [
  { name: "Marketplace", detail: "Buy and sell items near you", href: "/marketplace", image: "photo-1556742049-0cfed4f6a45d" },
  { name: "Facebook Reels", detail: "Watch short videos from creators", href: "/reels", image: "photo-1492619375914-88005aa9e8fb" },
  { name: "Groups", detail: "Find communities and local groups", href: "/groups", image: "photo-1529156069898-49953e39b3ac" },
  { name: "Gaming", detail: "Play games and watch live streams", href: "/gaming", image: "photo-1511512578047-dfb367046420" },
  { name: "Events", detail: "Discover upcoming events", href: "/events", image: "photo-1492684223066-81342ee5ff30" },
  { name: "Friends", detail: "Find friends and manage requests", href: "/friends", image: "photo-1529156069898-49953e39b3ac" },
];

const posts = [
  { title: "Peaceful moments from today", author: "Ayesha Khan", href: "/", image: "photo-1501785888041-af3ef285b470" },
  { title: "The city after sunset", author: "Hamza Ali", href: "/", image: "photo-1519501025264-65ba15a82390" },
  { title: "Weekend travel inspiration", author: "Sara Ahmed", href: "/", image: "photo-1500534314209-a25ddb2bd429" },
];

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = (params?.q || "").trim();
  const needle = query.toLowerCase();
  const matches = (text) => !needle || text.toLowerCase().includes(needle);
  const foundPeople = people.filter((item) => matches(`${item.name} ${item.detail}`));
  const foundDestinations = destinations.filter((item) => matches(`${item.name} ${item.detail}`));
  const foundPosts = posts.filter((item) => matches(`${item.title} ${item.author}`));
  const total = foundPeople.length + foundDestinations.length + foundPosts.length;

  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#18191a] px-3 py-5 sm:px-5 lg:ml-[360px] xl:mr-[360px]">
      <div className="mx-auto max-w-[680px]">
        <h1 className="text-2xl font-bold text-white">{query ? `Results for “${query}”` : "Search"}</h1>
        <p className="mt-1 text-sm text-[#b0b3b8]">{query ? `${total} results found` : "People, posts, pages and groups"}</p>

        {!total && query ? <div className="mt-4 rounded-lg bg-[#242526] py-16 text-center text-[#b0b3b8]"><p className="font-semibold text-white">No results found</p><p className="mt-1 text-sm">Try searching for people, pages, groups or posts.</p></div> : null}

        {foundPeople.length > 0 && <section className="mt-5 rounded-lg bg-[#242526] p-3"><h2 className="mb-2 text-lg font-bold text-white">People</h2>{foundPeople.map((person) => <Link key={person.name} href={person.href} className="flex items-center gap-3 rounded-lg p-2 hover:bg-[#3a3b3c]"><Image src={`https://i.pravatar.cc/150?img=${person.image}`} alt="" width={56} height={56} unoptimized className="rounded-full" /><div><p className="font-semibold text-white">{person.name}</p><p className="text-sm text-[#b0b3b8]">{person.detail}</p></div></Link>)}</section>}

        {foundDestinations.length > 0 && <section className="mt-4 rounded-lg bg-[#242526] p-3"><h2 className="mb-2 text-lg font-bold text-white">Pages and features</h2>{foundDestinations.map((item) => <Link key={item.name} href={item.href} className="flex items-center gap-3 rounded-lg p-2 hover:bg-[#3a3b3c]"><div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg"><Image src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=150&q=80`} alt="" fill sizes="56px" className="object-cover" /></div><div><p className="font-semibold text-white">{item.name}</p><p className="text-sm text-[#b0b3b8]">{item.detail}</p></div></Link>)}</section>}

        {foundPosts.length > 0 && <section className="mt-4 rounded-lg bg-[#242526] p-3"><h2 className="mb-2 text-lg font-bold text-white">Posts</h2>{foundPosts.map((post) => <Link key={post.title} href={post.href} className="flex items-center gap-3 rounded-lg p-2 hover:bg-[#3a3b3c]"><div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg"><Image src={`https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=150&q=80`} alt="" fill sizes="56px" className="object-cover" /></div><div><p className="font-semibold text-white">{post.title}</p><p className="text-sm text-[#b0b3b8]">{post.author}</p></div></Link>)}</section>}
      </div>
    </main>
  );
}
