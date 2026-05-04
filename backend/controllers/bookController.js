import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
  const { search, category, page = 1, limit = 12 } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
    ];
  }

  if (category) {
    query.category = category;
  }

  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 12;
  const total = await Book.countDocuments(query);
  const books = await Book.find(query)
    .sort({ createdAt: -1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  res.json({ books, total, page: pageNumber, pages: Math.ceil(total / pageSize) });
};

export const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }
  res.json(book);
};

export const createBook = async (req, res) => {
  const { title, author, edition, category, imageLink, fileLink, description, price, stock } = req.body;
  if (!title || !author || price == null || stock == null) {
    return res.status(400).json({ message: 'Title, author, price and stock are required.' });
  }

  const book = await Book.create({ title, author, edition, category, imageLink, fileLink, description, price, stock });
  res.status(201).json(book);
};

export const updateBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  const updates = ['title', 'author', 'edition', 'category', 'imageLink', 'fileLink', 'description', 'price', 'stock'];
  updates.forEach((field) => {
    if (req.body[field] !== undefined) {
      book[field] = req.body[field];
    }
  });

  await book.save();
  res.json(book);
};

export const deleteBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }
  await book.remove();
  res.json({ message: 'Book deleted successfully.' });
};
