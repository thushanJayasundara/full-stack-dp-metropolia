import React, { useState } from "react";
import "./App.css";

function BookCollectionManager() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    // Handle input change for title
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }

    // Handle input change for author
    function handleAuthorChange(event) {
        setAuthor(event.target.value);
    }

    // Add a new book to the list
    function addBook() {
        if (title.trim() !== "" && author.trim() !== "") {
            setBooks((b) => [...b, { title, author }]);
            setTitle("");
            setAuthor(""); // Clear the input fields
        }
    }

    // Delete a book from the list
    function deleteBook(index) {
        const updatedBooks = books.filter((_, i) => i !== index);
        setBooks(updatedBooks);
    }

    return (
        <div className="app-container">
            <h1>Book Collection Manager</h1>

            <div className="input-section">
                <input
                    type="text"
                    placeholder="Enter book title..."
                    value={title}
                    onChange={handleTitleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Enter author name..."
                    value={author}
                    onChange={handleAuthorChange}
                    className="input-field"
                />
                <button onClick={addBook} className="add-button">
                    Add Book
                </button>
            </div>

            <div className="books-section">
                <h2>Your Books ({books.length})</h2>
                {books.length === 0 ? (
                    <p className="empty-message">No books yet. Add one to get started!</p>
                ) : (
                    <ol className="books-list">
                        {books.map((book, index) => (
                            <li key={index} className="book-item">
                                <div className="book-info">
                                    <span className="book-title">{book.title}</span>
                                    <span className="book-author">by {book.author}</span>
                                </div>
                                <button
                                    onClick={() => deleteBook(index)}
                                    className="delete-button"
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ol>
                )}
            </div>
        </div>
    );
}

export default BookCollectionManager;