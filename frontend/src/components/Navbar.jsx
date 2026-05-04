import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice.js';

const NavLinkItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `rounded-md px-3 py-2 text-sm font-medium transition ${
        isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
);

function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const cartCount = useSelector((state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <NavLink className="text-xl font-semibold text-white" to="/">
            Bookstore
          </NavLink>
          <p className="text-sm text-slate-400">Browse, manage, and checkout with JWT security.</p>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-sm">
          <NavLinkItem to="/">Home</NavLinkItem>
          <a href="#info" className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition">Info</a>
          <a href="#shop" className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition">Shop</a>
          <a href="#contact" className="rounded-md px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition">Contact</a>
          <NavLinkItem to="/favorites">My Favorites</NavLinkItem>
          <NavLinkItem to="/cart">Cart ({cartCount})</NavLinkItem>
          {user ? (
            <>
              <NavLinkItem to="/admin/add-book">Admin</NavLinkItem>
              <button
                onClick={handleLogout}
                className="rounded-md bg-rose-500 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLinkItem to="/login">Login</NavLinkItem>
              <NavLinkItem to="/register">Register</NavLinkItem>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
