"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookValidationSchema = void 0;
const zod_1 = require("zod");
exports.bookValidationSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }).min(1, "Title cannot be empty"),
    author: zod_1.z.string({
        required_error: "Author is required",
        invalid_type_error: "Author must be a string"
    }).min(1, "Author cannot be empty"),
    genre: zod_1.z.string({
        required_error: "Genre is required",
        invalid_type_error: "Genre must be a string"
    }).min(1, "Genre cannot be empty"),
    isbn: zod_1.z.string({
        required_error: "ISBN is required",
        invalid_type_error: "ISBN must be a string"
    }).min(1, "ISBN cannot be empty"),
    description: zod_1.z.string({
        invalid_type_error: "Description Must be a string"
    }).optional(),
    copies: zod_1.z.number({
        required_error: "Copies is required",
        invalid_type_error: "Copies must be a number"
    })
        .min(0, { message: "Copies must be a positive number" })
        .int("Copies must be an integer"),
    available: zod_1.z.boolean().optional()
});
