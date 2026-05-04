import { Link } from 'react-router-dom';

function OrderSuccess() {
  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-10 text-center shadow-xl shadow-slate-950/20">
      <div className="mb-6 inline-flex rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-200">Order confirmed</div>
      <h1 className="text-3xl font-semibold text-white">Thank you for your purchase!</h1>
      <p className="mt-4 text-slate-400">Your checkout simulation is complete. We have recorded the order in the bookstore system.</p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-2xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-300"
      >
        Back to catalog
      </Link>
    </section>
  );
}

export default OrderSuccess;
