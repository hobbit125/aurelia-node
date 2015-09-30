import Book from './models/books.js';
import express from 'express';

// Define a new subroute for requests that
// start with /api/books
const router = express.Router();

global.app.use('/api/books', router);


// Handle /api/books/list by querying the database
// for all books and returning all records from the
// server and an error (if there was one) to the client
router.post('/list', (req, res) => {
  Book.find((err, books) => {
    res.send({ books, err });
  });
});

// Handle /api/books/save by creating a new book
// from the posted body JSON: { _id: 'XXX', description: 'YYY' }
// saving it to the database, and then return any error that
// occurred to the user
router.post('/save', (req, res) => {
  const book = new Book();

  book._id = req.body._id;
  book.description = req.body.description;

  book.save(err => {
    res.send({ err });
  });
});
