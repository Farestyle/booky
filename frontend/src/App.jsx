import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadUser } from './features/auth/authSlice.js';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Cart from './pages/Cart.jsx';
import BookForm from './pages/BookForm.jsx';
import Favorites from './pages/Favorites.jsx';
import OrderSuccess from './pages/OrderSuccess.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <main className="mx-auto max-w-full px-0 py-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/favorites"
            element={<ProtectedRoute><Favorites /></ProtectedRoute>}
          />
          <Route
            path="/cart"
            element={<ProtectedRoute><Cart /></ProtectedRoute>}
          />
          <Route
            path="/admin/add-book"
            element={<ProtectedRoute><BookForm /></ProtectedRoute>}
          />
          <Route
            path="/edit/:id"
            element={<ProtectedRoute><BookForm editMode /></ProtectedRoute>}
          />
          <Route
            path="/success"
            element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
