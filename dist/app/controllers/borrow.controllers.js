"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = __importDefault(require("../models/borrow.model"));
const borrow_validation_1 = require("../validators/borrow.validation");
const book_model_1 = __importDefault(require("../models/book.model"));
const errorHandler_1 = require("../errors/errorHandler");
exports.borrowRoutes = express_1.default.Router();
// Create Borrow
exports.borrowRoutes.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield borrow_validation_1.borrowValidationSchema.parseAsync(req.body);
        const book = yield book_model_1.default.findById(payload.book);
        if (!book) {
            throw new errorHandler_1.AppError(404, 'Book not found', {
                name: 'BookNotFound',
                bookId: payload.book
            });
        }
        yield book.borrowCopies(payload.quantity);
        const borrowRecord = new borrow_model_1.default({
            book: payload.book,
            quantity: payload.quantity,
            dueDate: payload.dueDate
        });
        yield borrowRecord.save();
        res.json({
            success: true,
            message: "Book borrowed successfully",
            data: borrowRecord
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.borrowRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const summaryData = yield borrow_model_1.default.aggregate([
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to retrieve borrowed summary",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}));
