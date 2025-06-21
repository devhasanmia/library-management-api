import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";
import { AppError } from "../errors/errorHandler";
const bookSchema = new Schema<IBook>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    isbn: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);
bookSchema.methods.borrowCopies = async function (quantity: number): Promise<IBook> {
  if (quantity <= 0) {
    throw new AppError(400, 'Quantity must be positive', {
      name: 'InvalidQuantity',
      min: 1
    });
  }
  if (this.copies < quantity) {
    throw new AppError(400, 'Not enough copies available', {
      name: 'InsufficientCopies',
      available: this.copies,
      requested: quantity
    });
  }
  this.copies -= quantity;
  if (this.copies === 0) {
    this.available = false;
  }
  return this.save();
};


const Book = model<IBook>("Book", bookSchema);

export default Book;
