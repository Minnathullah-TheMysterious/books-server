"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    title: { type: String, unique: true, required: true },
    author: { type: String, required: true },
    summary: { type: String, required: true },
}, { timestamps: true });
const bookModel = mongoose_1.default.model("book", bookSchema);
exports.default = bookModel;
