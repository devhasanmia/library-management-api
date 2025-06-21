"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./app/controllers/book.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const errorHandler_1 = require("./app/errors/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use("/api", book_controllers_1.bookRoutes);
app.use("/api/borrow", borrow_controllers_1.borrowRoutes);
app.use(errorHandler_1.globalErrorHandler);
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Library Management API Server',
        status: 'Running',
        version: '1.0.0',
        documentation: '/api/docs'
    });
});
exports.default = app;
