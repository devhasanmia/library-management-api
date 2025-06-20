import express, { Request, Response } from "express";
import Borrow from "../models/borrow.model";
import Book from "../models/book.model";
export const borrowRoutes = express.Router();

// Create Borrow
borrowRoutes.post("/borrow", async (req: Request, res: Response) => {
  const { book: bookId, quantity, dueDate } = req.body;
  const book = await Book.findById(bookId);

  if (!book) {
    return res.status(404).json({ success: false, message: "Book not found" });
  }

  if (book.copies < quantity) {
    return res
      .status(400)
      .json({ success: false, message: "Not enough copies available" });
  }

  book.copies -= quantity;
  if (book.copies === 0) {
    book.available = false;
  }
  await book.save();

  const borrow = await Borrow.create({ book: bookId, quantity, dueDate });

  return res.status(201).json({
    success: true,
    message: "Book borrowed successfully",
    data: borrow,
  });
});

borrowRoutes.get("/borrow", async (req: Request, res: Response) => {
  try {
    const summary = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },
      {
        $project: {
          _id: 0,
          book: {
            title: "$bookDetails.title",
            isbn: "$bookDetails.isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed summary",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
