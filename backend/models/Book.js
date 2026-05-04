import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    edition: { type: String, default: 'Standard Edition', trim: true },
    category: { type: String, trim: true },
    imageLink: { type: String, trim: true },
    fileLink: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', bookSchema);
export default Book;
