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
exports.deleteBookByIdController = exports.updateBookByIdController = exports.fetchBookByIdController = exports.fetchAllBooksController = exports.createBookController = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const mongoose_1 = require("mongoose");
/***************Create Book || POST************* */
const createBookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, summary } = req.body;
        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: "Book title is required" });
        }
        if (!author) {
            return res
                .status(400)
                .json({ success: false, message: "Book Author is required" });
        }
        if (!summary) {
            return res
                .status(400)
                .json({ success: false, message: "Book Summary is required" });
        }
        const checkTitle = yield bookModel_1.default.findOne({ title });
        if (checkTitle) {
            return res.status(409).json({
                success: false,
                message: "Book with the same title already exists",
            });
        }
        const book = yield bookModel_1.default.create({ title, author, summary });
        res.status(201).json({ success: true, message: "Book Created", book });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Something went wrong while creating the book. ${error.message}`);
            res.status(500).json({
                success: false,
                message: "Something went wrong while creating the book",
                error: error.message,
            });
        }
        else {
            console.error("An unknown error occurred");
        }
    }
});
exports.createBookController = createBookController;
/***************Fetch All Books || GET************* */
const fetchAllBooksController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield bookModel_1.default.find();
        if (!books || !(books === null || books === void 0 ? void 0 : books.length)) {
            return res.status(200).json({ success: true, message: "No Books Found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Fetched all the books", books });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Something went wrong while fetching all the books. ${error.message}`);
            res.status(500).json({
                success: false,
                message: "Something went wrong while fetching all the books",
                error: error.message,
            });
        }
        else {
            console.error("An unknown error occurred");
        }
    }
});
exports.fetchAllBooksController = fetchAllBooksController;
/***************Fetch Book By ID || GET************* */
const fetchBookByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(bookId)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }
        const book = yield bookModel_1.default.findById(bookId);
        if (!book) {
            return res
                .status(404)
                .json({ success: false, message: "Book Not Found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Fetched the Book", book });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Something went wrong while fetching the book. ${error.message}`);
            res.status(500).json({
                success: false,
                message: "Something went wrong while fetching the book",
                error: error.message,
            });
        }
        else {
            console.error("An unknown error occurred");
        }
    }
});
exports.fetchBookByIdController = fetchBookByIdController;
/***************Update Book By ID || PUT************* */
const updateBookByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const { title, author, summary } = req.body;
        if (!(0, mongoose_1.isValidObjectId)(bookId)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }
        if (!title) {
            return res
                .status(400)
                .json({ success: false, message: "Book title is required" });
        }
        if (!author) {
            return res
                .status(400)
                .json({ success: false, message: "Book Author is required" });
        }
        if (!summary) {
            return res
                .status(400)
                .json({ success: false, message: "Book Summary is required" });
        }
        const book = yield bookModel_1.default.findByIdAndUpdate(bookId, { title, author, summary }, { new: true });
        if (!book) {
            return res
                .status(404)
                .json({ success: false, message: "Book Not Found" });
        }
        return res
            .status(200)
            .json({ success: true, message: "Book Updated", book });
    }
    catch (error) {
        if (error instanceof Error) {
            if (error instanceof Error &&
                "code" in error &&
                error.code === 11000) {
                console.error(error);
                return res.status(409).json({
                    success: false,
                    message: "Book with the same name already exists",
                    error: error.message,
                });
            }
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong while updating the book",
                error: error.message,
            });
        }
        else {
            console.error("An unknown error occurred");
        }
    }
});
exports.updateBookByIdController = updateBookByIdController;
/***************Delete Book By ID || DELETE************* */
const deleteBookByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(bookId)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }
        const book = yield bookModel_1.default.findByIdAndDelete(bookId);
        if (!book) {
            return res.status(400).json({
                success: false,
                message: "No book found with the provided ID",
            });
        }
        return res.status(200).json({ success: true, message: "Book Deleted" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while deleting the book",
                error: error.message,
            });
        }
        else {
            console.error("An unknown error occurred");
        }
    }
});
exports.deleteBookByIdController = deleteBookByIdController;
