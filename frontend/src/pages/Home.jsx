import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient.js';
import { addItem } from '../features/cart/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../components/Footer.jsx';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    try {
      setStatus('loading');
      const response = await axiosClient.get('/books', { params: { search, category, limit: 9 } });
      setBooks(response.data.books);
      setStatus('succeeded');
      setError(null);
    } catch (err) {
      setStatus('failed');
      setError(err.response?.data?.message || 'Unable to load books');
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search, category]);

  const handleAddToCart = (book) => {
    dispatch(addItem({ bookId: book._id, title: book.title, price: book.price, quantity: 1 }));
    navigate('/cart');
  };

  const categories = useMemo(
    () => ['Philosophy', 'Design', 'Fiction', 'Business', 'Technology', 'Culture'],
    []
  );

  return (
    <div className="space-y-20">
      <section className="relative h-[85vh] overflow-hidden px-4">
        <div className="absolute inset-0">
          <img
            src="https://img.freepik.com/free-photo/stunning-low-angle-shot-beautiful-modern-library-with-bookshelves-with-lights_181624-27958.jpg"
            alt="Library Interior"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/50 to-zinc-950" />
        </div>
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center text-center text-white">
          <span className="mb-4 rounded-full bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.32em] text-amber-300">
            Premium Literary Collection
          </span>
          <h1 className="text-5xl font-black tracking-tight text-white drop-shadow-lg sm:text-6xl lg:text-7xl">
            The Architecture of Knowledge
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">
            Curated paper books and digital editions designed for the modern intellectual. Explore our latest Spring collections.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href="#shop"
              className="rounded-full bg-amber-500 px-8 py-4 text-sm font-bold uppercase tracking-widest text-slate-950 transition hover:bg-amber-400"
            >
              Explore Shop
            </a>
            <a
              href="#info"
              className="rounded-full border border-zinc-700 bg-zinc-900/80 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-zinc-800"
            >
              Our Story
            </a>
          </div>
        </div>
      </section>

      <section id="shop" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-amber-500 uppercase tracking-widest text-xs font-bold mb-1">Curated Catalogue</p>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">Available Editions</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by title, author, or description"
              className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-500 sm:w-80"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-amber-500 sm:w-64"
            >
              <option value="">All categories</option>
              {categories.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {user && (
              <Link
                to="/admin/add-book"
                className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        {error && <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-100">{error}</div>}

        <div className="grid gap-8 lg:grid-cols-3">
          {status === 'loading' && <div className="col-span-full text-center text-slate-400">Loading editions...</div>}
          {books.map((book) => (
            <article key={book._id} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 shadow-xl shadow-slate-950/20 transition hover:border-slate-700">
              <div className="relative h-72 overflow-hidden">
                <img
                  src={book.imageLink || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80'}
                  alt={book.title}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-zinc-950/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-amber-400 border border-slate-800">
                  {book.category || 'General'}
                </span>
              </div>
              <div className="p-6 flex h-full flex-col justify-between gap-5">
                <div>
                  <div className="mb-2 text-xs uppercase tracking-[0.32em] text-slate-500">{book.edition || 'Standard Edition'}</div>
                  <h3 className="text-2xl font-bold text-white">{book.title}</h3>
                  <p className="mt-3 text-slate-400 leading-relaxed">{book.description || 'A premium publication curated for modern readers.'}</p>
                </div>
                <div className="grid gap-3 border-t border-slate-800 pt-4 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-200">Author</span>
                    <span>{book.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-200">Price</span>
                    <span>${book.price?.toFixed(2) ?? '0.00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-200">Stock</span>
                    <span>{book.stock ?? 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-slate-200">Digital asset</span>
                    <a href={book.fileLink || '#'} target="_blank" rel="noreferrer" className="text-amber-400 hover:text-amber-300">
                      View
                    </a>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => handleAddToCart(book)}
                    className="rounded-3xl bg-amber-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-amber-400"
                  >
                    Add to Cart
                  </button>
                  <button className="rounded-3xl border border-slate-800 bg-slate-950 px-4 py-3 text-slate-300 transition hover:border-amber-500 hover:text-white">
                    <i className="fa-regular fa-heart" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="info" className="border-t border-slate-800 bg-slate-900/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 items-center">
          <div>
            <span className="text-xs text-amber-500 uppercase tracking-widest mb-3 block font-bold">Our Heritage</span>
            <h2 className="text-4xl font-extrabold tracking-tight text-white">A Synthesis of Art, Technology & Literature</h2>
            <p className="mt-6 text-slate-400 leading-relaxed">
              Our platform presents information with architectural clarity and high-end aesthetics. We merge physical and digital editions into a premium experience for modern readers.
            </p>
            <div className="mt-8 flex items-center gap-6 text-2xl text-zinc-400">
              <a href="#" className="transition hover:text-amber-500"><i className="fa-brands fa-twitter" /></a>
              <a href="#" className="transition hover:text-amber-500"><i className="fa-brands fa-instagram" /></a>
              <a href="#" className="transition hover:text-amber-500"><i className="fa-brands fa-linkedin" /></a>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-4 text-amber-500 text-3xl"><i className="fa-solid fa-book-open" /></div>
              <h3 className="text-xl font-bold text-white">Paper Books</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">High-quality tactile editions with premium cover art and detailed print layouts.</p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 p-6">
              <div className="mb-4 text-amber-500 text-3xl"><i className="fa-solid fa-bolt" /></div>
              <h3 className="text-xl font-bold text-white">eBooks</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">Instantly accessible digital editions, downloadable files, and immersive reading assets.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
