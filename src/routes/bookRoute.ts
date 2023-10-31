import { Router as ExpressRouter } from "express";
import {
  createBookController,
  deleteBookByIdController,
  fetchAllBooksController,
  fetchBookByIdController,
  updateBookByIdController,
} from "../controllers/bookController";

const router: ExpressRouter = ExpressRouter();

/*********Create Book********* */
router.post("/create", createBookController);

/*********Fetch All Books********* */
router.get("/fetch-all", fetchAllBooksController);

/*********Fetch Book By ID********* */
router.get("/fetch/:bookId", fetchBookByIdController);

/*********Update Book By ID********* */
router.put("/update/:bookId", updateBookByIdController);

/*********Delete Book By ID********* */
router.delete("/delete/:bookId", deleteBookByIdController);

export default router;
