import Book from './models/books.js';
import express from 'express';

const router = express.Router();
global.app.use('/api/books', router);

router.post('/list', (req, res) => {
  Book.find((err, books) => {
    res.send({ books: books, err: err });
  });
});

router.post('/save', (req, res) => {
  const book = new Book();
  book._id = req.body._id;
  book.description = req.body.description;

  book.save(err => {
    res.send({ err: err });
  });
});
