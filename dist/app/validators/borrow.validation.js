"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowValidationSchema = void 0;
const zod_1 = require("zod");
exports.borrowValidationSchema = zod_1.z.object({
    book: zod_1.z.string({
        invalid_type_error: "Book must be a Book Id",
        required_error: "Book Must a Requird"
    }),
    quantity: zod_1.z.preprocess((val) => Number(val), zod_1.z
        .number({ invalid_type_error: "Quantity must be a number" })
        .min(1, { message: "Quantity must be at least 1" })),
    dueDate: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid due date",
    }),
});
