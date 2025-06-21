"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = exports.AppError = void 0;
const zod_1 = require("zod");
const errorFormatter_1 = require("../utils/errorFormatter");
class AppError extends Error {
    constructor(statusCode, message, errorDetails) {
        super(message);
        this.statusCode = statusCode;
        this.errorDetails = errorDetails;
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.AppError = AppError;
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof zod_1.z.ZodError) {
        const formattedError = (0, errorFormatter_1.formatZodError)(err);
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: formattedError
        });
        return;
    }
    if (typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        err.code === 11000) {
        const keyValue = err.keyValue || {};
        res.status(409).json({
            success: false,
            message: "Duplicate entry. This data already exists.",
            keyValue
        });
        return;
    }
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err.errorDetails || { name: "ApplicationError" }
        });
        return;
    }
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: {
            name: "Internal ServerError",
            message: errorMessage,
            stack: err instanceof Error ? err.stack : undefined
        }
    });
};
exports.globalErrorHandler = globalErrorHandler;
