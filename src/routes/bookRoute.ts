import { Router as ExpressRouter } from "express";
import {
  createBookController,
  deleteBookByIdController,
  fetchAllBooksController,
  fetchBookByIdController,
  searchBookByTitleOrAuthorController,
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

/*************Search Book By Title Or Author************ */
router.post('/search', searchBookByTitleOrAuthorController)

export default router;
