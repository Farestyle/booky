import Order from '../models/Order.js';

export const checkout = async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Cart items are required to complete checkout.' });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await Order.create({
    user: req.user._id,
    items,
    total,
  });

  res.status(201).json({ message: 'Order confirmed.', order });
};
