import { z } from "zod";

export const bookValidationSchema = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }).min(1, "Title cannot be empty"),
    author: z.string({
        required_error: "Author is required",
        invalid_type_error: "Author must be a string"
    }).min(1, "Author cannot be empty"),
    genre: z.string({
        required_error: "Genre is required",
        invalid_type_error: "Genre must be a string"
    }).min(1, "Genre cannot be empty"),
    isbn: z.string({
        required_error: "ISBN is required",
        invalid_type_error: "ISBN must be a string"
    }).min(1, "ISBN cannot be empty"),
    description: z.string({
        invalid_type_error: "Description Must be a string"
    }).optional(),
    copies: z.number({
        required_error: "Copies is required",
        invalid_type_error: "Copies must be a number"
    })
        .min(0, { message: "Copies must be a positive number" })
        .int("Copies must be an integer"),
    available: z.boolean().optional()
});
