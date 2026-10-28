import SectionPage from "../components/SectionPage";

export default function ReelsPage() {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#18191a] px-4 py-6 lg:ml-[360px] xl:mr-[360px]">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold text-white">Reels</h1>
        <p className="mt-2 text-gray-400">Watch and discover short videos.</p>
        <div className="mt-6 space-y-4">
          {["Recommended reel", "Following reel", "Trending reel"].map((title, index) => (
            <article key={title} className="flex h-[420px] items-end rounded-xl bg-gradient-to-br from-[#3a3b3c] to-[#242526] p-5 text-white">
              <div><span className="text-xs text-blue-400">Reel {index + 1}</span><h2 className="mt-1 text-xl font-bold">{title}</h2></div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
