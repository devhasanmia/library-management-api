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
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = __importDefault(require("../models/book.model"));
const book_validation_1 = require("../validators/book.validation");
exports.bookRoutes = express_1.default.Router();
// Create Book
exports.bookRoutes.post("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = yield book_validation_1.bookValidationSchema.parseAsync(req.body);
        const book = yield book_model_1.default.create(payload);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get All Books
exports.bookRoutes.get("/books", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = "createdAt", sort = "desc", limit = "10", } = req.query;
        const query = {};
        if (filter) {
            query.genre = filter.toString().toUpperCase();
        }
        const books = yield book_model_1.default.find(query)
            .sort({ [sortBy.toString()]: sort === "asc" ? 1 : -1 })
            .limit(parseInt(limit.toString()));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books,
        });
    }
    catch (error) {
        next(error);
    }
}));
// Get Book by ID
exports.bookRoutes.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield book_model_1.default.findById(bookId);
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: book,
    });
}));
// Update Book
exports.bookRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const book = yield book_model_1.default.findByIdAndUpdate(bookId);
    res.status(201).json({
        success: true,
        message: "Books retrieved successfully",
        data: book,
    });
}));
// Delete Book
exports.bookRoutes.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    yield book_model_1.default.findByIdAndDelete(bookId);
    res.status(201).json({
        success: true,
        message: "Book deleted successfully",
        data: null,
    });
}));
