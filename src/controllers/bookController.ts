import { Request, Response } from "express";
import bookModel from "../models/bookModel";
import { isValidObjectId } from "mongoose";

interface bookBody {
  title: string;
  author: string;
  summary: string;
}

/***************Create Book || POST************* */
export const createBookController = async (req: Request, res: Response) => {
  try {
    const { title, author, summary } = req.body as bookBody;

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

    const checkTitle = await bookModel.findOne({ title });

    if (checkTitle) {
      return res.status(409).json({
        success: false,
        message: "Book with the same title already exists",
      });
    }

    const book = await bookModel.create({ title, author, summary });

    res.status(201).json({ success: true, message: "Book Created", book });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Something went wrong while creating the book. ${error.message}`
      );

      res.status(500).json({
        success: false,
        message: "Something went wrong while creating the book",
        error: error.message,
      });
    } else {
      console.error("An unknown error occurred");
    }
  }
};

/***************Fetch All Books || GET************* */
export const fetchAllBooksController = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;

    const defaultLimit: number = 10;
    const defaultPage: number = 1;

    const books = await bookModel
      .find()
      .limit(limit ? +limit : defaultLimit)
      .skip(
        (page && +page > 0 ? +page - 1 : defaultPage - 1) *
          (limit ? +limit : defaultLimit)
      );

    const booksLength = await bookModel.find();

    if (!books || !books?.length) {
      return res
        .status(404)
        .json({ success: false, message: "No Books Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched all the books",
      totalDocsCount: booksLength.length,
      books,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Something went wrong while fetching all the books. ${error.message}`
      );

      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching all the books",
        error: error.message,
      });
    } else {
      console.error("An unknown error occurred");
    }
  }
};

/***************Fetch Book By ID || GET************* */
export const fetchBookByIdController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    if (!isValidObjectId(bookId)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const book = await bookModel.findById(bookId);

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Fetched the Book", book });
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Something went wrong while fetching the book. ${error.message}`
      );

      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching the book",
        error: error.message,
      });
    } else {
      console.error("An unknown error occurred");
    }
  }
};

/***************Update Book By ID || PUT************* */
export const updateBookByIdController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { title, author, summary } = req.body as bookBody;

    if (!isValidObjectId(bookId)) {
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

    const book = await bookModel.findByIdAndUpdate(
      bookId,
      { title, author, summary },
      { new: true }
    );

    if (!book) {
      return res
        .status(404)
        .json({ success: false, message: "Book Not Found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Book Updated", book });
  } catch (error) {
    if (error instanceof Error) {
      if (
        error instanceof Error &&
        "code" in error &&
        (error as any).code === 11000
      ) {
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
    } else {
      console.error("An unknown error occurred");
    }
  }
};

/***************Delete Book By ID || DELETE************* */
export const deleteBookByIdController = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    if (!isValidObjectId(bookId)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const book = await bookModel.findByIdAndDelete(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "No book found with the provided ID",
      });
    }

    return res.status(200).json({ success: true, message: "Book Deleted" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while deleting the book",
        error: error.message,
      });
    } else {
      console.error("An unknown error occurred");
    }
  }
};

/***************Search Book By Title or Author || POST************* */
export const searchBookByTitleOrAuthorController = async (
  req: Request,
  res: Response
) => {
  try {
    const { searchInput } = req.body;
    const { page, limit } = req.query;

    const defaultLimit: number = 10;
    const defaultPage: number = 1;

    if (!searchInput) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an input to search" });
    }

    const books = await bookModel
      .find({
        $or: [
          { title: { $regex: searchInput, $options: "i" } },
          { author: { $regex: searchInput, $options: "i" } },
        ],
      })
      .limit(limit ? +limit : defaultLimit)
      .skip(
        (page && +page > 0 ? +page - 1 : defaultPage - 1) *
          (limit ? +limit : defaultLimit)
      );

    const booksLength = await bookModel.find({
      $or: [
        { title: { $regex: searchInput, $options: "i" } },
        { author: { $regex: searchInput, $options: "i" } },
      ],
    });

    if (!books || !books.length) {
      return res.status(404).json({
        success: false,
        message: "Search Results Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book(s) Found",
      totalDocsCount: booksLength.length,
      books,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        success: false,
        message: "Something went wrong while searching the book",
        error: error.message,
      });
    } else {
      console.error("An unknown error occurred");
    }
  }
};
