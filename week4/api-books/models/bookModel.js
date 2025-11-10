// The data model for a book is as follows
/*
{
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "pages": 180
}
*/

let bookArray = [];

let nextId = 1;

function getAll() {
    return bookArray;
}

function addOne(title, author, pages) {
    // Check if any parameter is empty or undefined
    if (!title || !author || pages === undefined) {
        return false;
    }

    const newBook = {
        id: nextId++,
        title,
        author,
        pages
    };

    bookArray.push(newBook);
    return newBook;
}

function findById(id) {
    const numericId = Number(id);
    const book = bookArray.find(item => item.id === numericId);
    if (book) {
        return book;
    } else {
        return false;
    }
}

function updateOneById(id, updatedData) {
    const book = findById(id);
    if (book) {
        // Update properties only if provided in updatedData
        if (updatedData.title) {
            book.title = updatedData.title;
        }
        if (updatedData.author) {
            book.author = updatedData.author;
        }
        if (updatedData.pages !== undefined) {
            book.pages = updatedData.pages;
        }
        return book;
    }
    return false;
}

function deleteOneById(id) {
    const book = findById(id);
    if (book) {
        const initialLength = bookArray.length;
        bookArray = bookArray.filter(book => book.id !== Number(id));
        return bookArray.length < initialLength; // Indicate successful deletion if the length has decreased
    }
    return false; // Return false if the item was not found
}

if (require.main === module) {
    // Add book
    let result = addOne("The Great Gatsby", "F. Scott Fitzgerald", 180);
    console.log(result);
    // Add another book
    result = addOne("To Kill a Mockingbird", "Harper Lee", 281);
    console.log(result);

    console.log("getAll called:", getAll());

    console.log("findById called:", findById(1));

    console.log("updateOneById called:", updateOneById(1, { pages: 190 }));
    console.log("findById called after item updated:", findById(1));

    console.log("deleteOneById called:", deleteOneById(1));
    console.log("findById called after item deleted:", findById(1));
}

Book = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
};

module.exports = Book;
