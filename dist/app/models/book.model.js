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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const errorHandler_1 = require("../errors/errorHandler");
const bookSchema = new mongoose_1.Schema({
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
}, { timestamps: true, versionKey: false });
bookSchema.methods.borrowCopies = function (quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        if (quantity <= 0) {
            throw new errorHandler_1.AppError(400, 'Quantity must be positive', {
                name: 'InvalidQuantity',
                min: 1
            });
        }
        if (this.copies < quantity) {
            throw new errorHandler_1.AppError(400, 'Not enough copies available', {
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
    });
};
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
