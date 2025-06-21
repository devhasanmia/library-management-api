import express, { NextFunction, Request, Response } from "express";
import Book from "../models/book.model";
import { bookValidationSchema } from "../validators/book.validation";
import { AppError } from "../errors/errorHandler";
export const bookRoutes = express.Router();

// Create Book
bookRoutes.post("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = await bookValidationSchema.parseAsync(req.body);
    const book = await Book.create(payload);
    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error) {
    next(error)
  }
});
// Get All Books
bookRoutes.get("/books", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      filter,
      sortBy = "createdAt",
      sort = "desc",
      limit = "10",
    } = req.query;
    const query: any = {};
    if (filter) {
      query.genre = filter.toString().toUpperCase();
    }
    const books = await Book.find(query)
      .sort({ [sortBy.toString()]: sort === "asc" ? 1 : -1 })
      .limit(parseInt(limit.toString()));
    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: books,
    });
  } catch (error: any) {
    next(error)
  }
});
// Get Book by ID
bookRoutes.get("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  if (!book) {
    throw new AppError(404, "Book not found");
  }
  res.status(200).json({
    success: true,
    message: "Books retrieved successfully",
    data: book,
  });
});
// Update Book
bookRoutes.put("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndUpdate(bookId, req.body, { new: true });
  if (!book) {
    throw new AppError(404, "Book not found");
  }
  res.status(200).json({
    success: true,
    message: "Book updated successfully",
    data: book,
  });
});
// Delete Book
bookRoutes.delete("/books/:bookId", async (req: Request, res: Response) => {
  const { bookId } = req.params;
  const book = await Book.findByIdAndDelete(bookId);
  if (!book) {
    throw new AppError(404, "Book not found");
  }
  res.status(204).json({
    success: true,
    message: "Book deleted successfully",
    data: null,
  });
});
