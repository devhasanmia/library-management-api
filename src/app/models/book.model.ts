import { Schema, model } from "mongoose";
import { IBook } from "../interfaces/book.interface";
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

const Book = model<IBook>("Book", bookSchema);

export default Book;
