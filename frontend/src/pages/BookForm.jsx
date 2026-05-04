import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient.js';

function BookForm({ editMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    author: '',
    edition: '',
    category: '',
    imageLink: '',
    fileLink: '',
    description: '',
    price: 0,
    stock: 0,
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editMode && id) {
      const fetchBook = async () => {
        try {
          const response = await axiosClient.get(`/books/${id}`);
          setForm(response.data);
        } catch (err) {
          setError(err.response?.data?.message || 'Unable to load book');
        }
      };
      fetchBook();
    }
  }, [editMode, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setStatus('loading');
      if (editMode && id) {
        await axiosClient.put(`/books/${id}`, form);
      } else {
        await axiosClient.post('/books', form);
      }
      setStatus('succeeded');
      navigate('/');
    } catch (err) {
      setStatus('failed');
      setError(err.response?.data?.message || 'Unable to save book');
    }
  };

  return (
    <section className="mx-auto max-w-3xl rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl shadow-slate-950/20">
      <h1 className="mb-4 text-3xl font-semibold text-white">{editMode ? 'Edit book' : 'Add new book'}</h1>
      <p className="mb-6 text-slate-400">Enter book details to publish or update the catalog.</p>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <label className="text-sm text-slate-300">
          Title
          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
            required
          />
        </label>
        <label className="text-sm text-slate-300">
          Author
          <input
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
            required
          />
        </label>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-300">
            Edition
            <input
              value={form.edition}
              onChange={(e) => setForm({ ...form, edition: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              placeholder="2026 First Print"
            />
          </label>
          <label className="text-sm text-slate-300">
            Category
            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              placeholder="Philosophy"
            />
          </label>
        </div>
        <label className="text-sm text-slate-300">
          Cover Image URL
          <input
            type="url"
            value={form.imageLink}
            onChange={(e) => setForm({ ...form, imageLink: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
            placeholder="https://example.com/cover.jpg"
          />
        </label>
        <label className="text-sm text-slate-300">
          Uploaded File URL
          <input
            type="url"
            value={form.fileLink}
            onChange={(e) => setForm({ ...form, fileLink: e.target.value })}
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
            placeholder="https://example.com/book.pdf"
          />
        </label>
        <label className="text-sm text-slate-300">
          Description
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows="4"
            className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm text-slate-300">
            Price
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              min="0"
              step="0.01"
              required
            />
          </label>
          <label className="text-sm text-slate-300">
            Stock
            <input
              type="number"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-emerald-500"
              min="0"
              required
            />
          </label>
        </div>
        {error && <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-100">{error}</div>}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:opacity-50"
        >
          {status === 'loading' ? 'Saving…' : editMode ? 'Update book' : 'Create book'}
        </button>
      </form>
    </section>
  );
}

export default BookForm;
