import express, { NextFunction, Request, Response } from "express";
import Borrow from "../models/borrow.model";
import { borrowValidationSchema } from "../validators/borrow.validation";
import mongoose from "mongoose";
import Book from "../models/book.model";
import { AppError } from "../errors/errorHandler";
export const borrowRoutes = express.Router();

// Create Borrow
borrowRoutes.post("/", async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const payload = await borrowValidationSchema.parseAsync(req.body);
    const book = await Book.findById(payload.book).session(session);
    if (!book) {
      throw new AppError(404, 'Book not found', {
        name: 'BookNotFound',
        bookId: payload.book
      });
    }
    await book.borrowCopies(payload.quantity);
    const borrowRecord = new Borrow({
      book: payload.book,
      quantity: payload.quantity,
      dueDate: payload.dueDate
    });
    await borrowRecord.save({ session });
    await session.commitTransaction();
    res.json({
      success: true,
      message: "Book borrowed successfully",
      data: borrowRecord
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const summaryData = await Borrow.aggregate([
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
        }
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: summaryData.map(item => ({
        book: item.book,
        totalQuantity: item.totalQuantity,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve borrowed summary",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
