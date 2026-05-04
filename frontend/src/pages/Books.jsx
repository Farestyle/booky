import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient.js';
import { addItem } from '../features/cart/cartSlice.js';

const genres = ['Fiction', 'Non-fiction', 'Mystery', 'Fantasy', 'Romance', 'Science', 'Business'];

function Books() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setStatus('loading');
      const response = await axiosClient.get('/books', {
        params: { search, genre, page, limit: 8 },
      });
      setBooks(response.data.books);
      setPages(response.data.pages);
      setStatus('succeeded');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load books');
      setStatus('failed');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, genre, page]);

  const handleAddToCart = (book) => {
    dispatch(addItem({ bookId: book._id, title: book.title, price: book.price, quantity: 1 }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this book from the catalog?')) return;
    await axiosClient.delete(`/books/${id}`);
    fetchBooks();
  };

  const pageNumbers = useMemo(() => Array.from({ length: pages }, (_, index) => index + 1), [pages]);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">Book catalog</h1>
            <p className="mt-1 text-slate-400">Search, filter, and manage books in your store.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, or description"
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 sm:w-80"
            />
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-500 sm:w-56"
            >
              <option value="">All genres</option>
              {genres.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {user && (
              <button
                onClick={() => navigate('/manage')}
                className="rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Add book
              </button>
            )}
          </div>
        </div>
      </div>

      {error && <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">{error}</div>}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {status === 'loading' && <div className="col-span-full text-center text-slate-400">Loading books...</div>}
        {books.map((book) => (
          <article key={book._id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/20">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">{book.title}</h2>
                <p className="text-sm text-slate-400">by {book.author}</p>
              </div>
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">{book.genre || 'General'}</span>
            </div>
            <p className="mt-4 leading-7 text-slate-300">{book.description || 'No description provided yet.'}</p>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-slate-300">
              <div>
                <p className="text-lg font-semibold text-white">${book.price.toFixed(2)}</p>
                <p className="text-sm text-slate-500">Stock: {book.stock}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => handleAddToCart(book)}
                  className="rounded-2xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
                >
                  Add to cart
                </button>
                {user && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate(`/edit/${book._id}`)}
                      className="rounded-2xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-slate-200 transition hover:border-emerald-500 hover:text-white"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(book._id)}
                      className="rounded-2xl border border-rose-500 bg-rose-500/10 px-4 py-2 text-sm text-rose-200 transition hover:bg-rose-500/20"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            type="button"
            onClick={() => setPage(number)}
            className={`rounded-full px-4 py-2 text-sm ${number === page ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
          >
            {number}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Books;
