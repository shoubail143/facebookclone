export default function SectionPage({ title, description, cards = [] }) {
  return (
    <main className="min-h-[calc(100vh-56px)] bg-[#18191a] px-4 py-6 lg:ml-[360px] xl:mr-[360px]">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-gray-400">{description}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {(cards.length ? cards : ["Your activity", "Discover", "Recent updates"]).map((card) => (
            <article
              key={card}
              className="min-h-32 rounded-xl border border-white/5 bg-[#242526] p-5 text-gray-200"
            >
              {typeof card === "string" ? <span className="text-lg font-semibold">{card}</span> : card}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
