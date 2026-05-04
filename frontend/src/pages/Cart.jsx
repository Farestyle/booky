import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient.js';
import { clearCart, removeItem, updateQuantity } from '../features/cart/cartSlice.js';

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleCheckout = async () => {
    try {
      await axiosClient.post('/orders', { items });
      dispatch(clearCart());
      navigate('/success');
    } catch (error) {
      alert(error.response?.data?.message || 'Checkout failed.');
    }
  };

  if (items.length === 0) {
    return (
      <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 text-center text-slate-300">
        <h1 className="text-3xl font-semibold text-white">Your cart is empty</h1>
        <p className="mt-3 text-slate-400">Add books from the catalog to begin checkout.</p>
      </section>
    );
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <h1 className="mb-6 text-3xl font-semibold text-white">Shopping cart</h1>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.bookId} className="rounded-3xl border border-slate-800 bg-slate-950 p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="text-sm text-slate-400">Unit price: ${item.price.toFixed(2)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeItem(item.bookId))}
                  className="rounded-2xl border border-rose-500 px-3 py-2 text-sm text-rose-200 hover:bg-rose-500/10"
                >
                  Remove
                </button>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm text-slate-300">Quantity</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => dispatch(updateQuantity({ bookId: item.bookId, quantity: Number(e.target.value) }))}
                  className="w-20 rounded-2xl border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl shadow-slate-950/20">
        <h2 className="text-xl font-semibold text-white">Order summary</h2>
        <p className="mt-3 text-slate-400">Review and checkout securely with JWT authentication.</p>
        <div className="mt-6 space-y-3 rounded-3xl bg-slate-950/80 p-4 text-slate-300">
          <div className="flex justify-between text-sm">
            <span>Items</span>
            <span>{items.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={handleCheckout}
          className="mt-6 w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
        >
          Proceed to checkout
        </button>
      </div>
    </section>
  );
}

export default Cart;
