function Favorites() {
  return (
    <section className="mx-auto max-w-6xl space-y-10 px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/10">
        <h1 className="text-3xl font-bold text-white">My Favorites</h1>
        <p className="mt-3 text-slate-400">Browse your selected Paper Books and eBooks in a premium reading collection.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold text-white">Paper Books</h2>
          <p className="mt-3 text-slate-400 leading-relaxed">A curated selection of tactile editions and hardcover releases, kept for inspiration and design study.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>• The Modern Manifesto — Julian Vance</li>
            <li>• Vogue of the Night — Patricia B.</li>
            <li>• The Echo of Cities — Leona Hart</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
          <h2 className="text-2xl font-semibold text-white">eBooks</h2>
          <p className="mt-3 text-slate-400 leading-relaxed">Instant access to digital editions, white papers, and architecture files with high-fidelity downloads.</p>
          <ul className="mt-6 space-y-3 text-sm text-slate-300">
            <li>• Urban Blueprint Vol. 81 — F. Ayachi</li>
            <li>• Coded Paper — S. Novak</li>
            <li>• Visual Library — R. Chen</li>
          </ul>
        </article>
      </div>
    </section>
  );
}

export default Favorites;
