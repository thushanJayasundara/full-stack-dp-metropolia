const Book = require("../models/bookModel");

// GET /books
const getAllBooks = (req, res) => {
  const books = Book.getAll();
  res.json(books);
};

// POST /books
const createBook = (req, res) => {
  const { title, author, pages } = req.body;

  const newBook = Book.addOne(title, author, pages);

  if (newBook) {
    res.json(newBook);
  } else {
    res.status(500).json({ message: "Failed to create book" });
  }
};

// GET /books/:bookId
const getBookById = (req, res) => {
  const bookId = req.params.bookId;
  const book = Book.findById(bookId);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

// PUT /books/:bookId
const updateBook = (req, res) => {
  const bookId = req.params.bookId;

  const { title, author, pages } = req.body;

  const updatedBook = Book.updateOneById(bookId, { title, author, pages });

  if (updatedBook) {
    res.json(updatedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

// DELETE /books/:bookId
const deleteBook = (req, res) => {
  const bookId = req.params.bookId;

  const isDeleted = Book.deleteOneById(bookId);

  if (isDeleted) {
    res.json({ message: "Book deleted successfully" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
