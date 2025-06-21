import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { z } from 'zod';
import { formatZodError } from '../utils/errorFormatter';

export class AppError extends Error {
    constructor(
        public statusCode: number,
        message: string,
        public errorDetails?: any
    ) {
        super(message);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}

export const globalErrorHandler: ErrorRequestHandler = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof z.ZodError) {
        const formattedError = formatZodError(err);
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: formattedError
        });
        return;
    }
    if (
        typeof err === 'object' &&
        err !== null &&
        'code' in err &&
        (err as any).code === 11000
    ) {
        const keyValue = (err as any).keyValue || {};
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