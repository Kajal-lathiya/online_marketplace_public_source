import express from "express";
import { Result } from "express-validator";
import BooksModal from "./booksModel.js";
import httpErrors from "http-errors";

const booksRouter = express.Router();

// GET Books page
// router.get('/', booksController.all_books);
const { NotFound } = httpErrors;

booksRouter.get("/", async (req, res, next) => {
  try {
    const books = await BooksModal.find({});
    res.send(books);
  } catch (error) {
    next(error);
  }
});

// GET a book by ID
// router.get('/book_details/:id', booksController.book_details);
booksRouter.get("/book_details/:id", async (req, res, next) => {
  try {
    const book = await BooksModal.findById(req.params.id);
    if (book) {
      res.send(book);
    } else {
      next(NotFound(`Product id ${req.params.id} not found!`));
    }
  } catch (error) {
    next(error);
  }
});

// // GET books by searching book's title
// router.get('/book_search_title/:search_title', booksController.search_book_title);

booksRouter.get("/", async (req, res, next) => {
  try {
    const new_book = new BooksModal({
      title: req.body.title,
      author: req.body.author,
      price: parseFloat(req.body.price),
      image_src: req.body.image_src,
      isbn_13: req.body.isbn_13,
      publisher: req.body.publisher,
      publish_date: req.body.publish_date,
      pages: parseInt(req.body.pages)
    });
    BooksModal.create(new_book, (err, newBook) => {
      if (newBook) {
        res.send(newBook);
      } else {
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
});

export default booksRouter;
