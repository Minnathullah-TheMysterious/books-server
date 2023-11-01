"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
const router = (0, express_1.Router)();
/*********Create Book********* */
router.post("/create", bookController_1.createBookController);
/*********Fetch All Books********* */
router.get("/fetch-all", bookController_1.fetchAllBooksController);
/*********Fetch Book By ID********* */
router.get("/fetch/:bookId", bookController_1.fetchBookByIdController);
/*********Update Book By ID********* */
router.put("/update/:bookId", bookController_1.updateBookByIdController);
/*********Delete Book By ID********* */
router.delete("/delete/:bookId", bookController_1.deleteBookByIdController);
/*************Search Book By Title Or Author************ */
router.post('/search', bookController_1.searchBookByTitleOrAuthorController);
exports.default = router;
