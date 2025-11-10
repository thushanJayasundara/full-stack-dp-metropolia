# API Books - MVC & Routing Refactor Task

## Overview
In this task, you will refactor the `api-books` project to follow the **Model-View-Controller (MVC)** architectural pattern and implement a dedicated routing system. This will make your code more organized, scalable, and maintainable.

### What is MVC?
- **Model**: Handles data and business logic (bookModel.js)
- **View**: Returns data to the client (handled by Express responses)
- **Controller**: Processes requests and coordinates between Model and View (bookControllers.js)
- **Router**: Defines API endpoints and maps them to controllers (routes/bookRouter.js)

---

## Step 1: Rename bookLib.js to bookModel.js

### Instructions
1. Rename `api-books/bookLib.js` to `api-books/bookModel.js`
2. This file represents the **Model** layer - it handles all data operations

### Explanation
The Model layer should contain all business logic and data management. By renaming `bookLib` to `bookModel`, we're making it clear that this file is the data model for books. The model is independent of Express and can be reused anywhere in your application.

### Testing with Postman
You don't need to test this step yet - the rename doesn't affect the running API.

---

## Step 2: Update app.js to import from bookModel.js (temporary)

### Instructions
1. Open `api-books/bookHandlers.js`
2. Update the import statement:
```javascript
// OLD
const Book = require("./bookLib");

// NEW
const Book = require("./bookModel");
```

### Explanation
Since we renamed the file, we need to update the import path in the handlers. The handlers still reference the model, but now they're importing from the new filename.

### Testing with Postman
1. Make sure the server is still running (if not, run `node app.js`)
2. Test a GET request to `http://localhost:4000/books`
3. Verify you get the expected response

---

## Step 3: Rename bookHandlers.js to bookControllers.js

### Instructions
1. Rename `api-books/bookHandlers.js` to `api-books/bookControllers.js`

### Explanation
The Controller layer handles HTTP requests and responses. By renaming `bookHandlers` to `bookControllers`, we're following standard MVC naming conventions. Controllers receive requests from the router, interact with the model, and return responses to the client.

### Testing with Postman
1. Update `api-books/app.js` to import from the new file:
```javascript
// OLD
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("./bookHandlers");

// NEW
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("./bookControllers");
```

2. Test all endpoints with Postman:
   - **GET** `http://localhost:4000/books` - Should return all books
   - **POST** `http://localhost:4000/books` - Create a book with JSON body: `{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "pages": 180}`
   - **GET** `http://localhost:4000/books/1` - Get book with ID 1
   - **PUT** `http://localhost:4000/books/1` - Update book with JSON body: `{"title": "The Great Gatsby Updated", "author": "F. Scott Fitzgerald", "pages": 190}`
   - **DELETE** `http://localhost:4000/books/1` - Delete book with ID 1

---

## Step 4: Extract Routes to routes/bookRouter.js

### Instructions

#### 4.1 Create the routes directory and file
1. Create a new folder: `api-books/routes/`
2. Create a new file: `api-books/routes/bookRouter.js`

#### 4.2 Add router logic to bookRouter.js
```javascript
const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../bookControllers");

// GET /books
router.get("/", getAllBooks);

// POST /books
router.post("/", createBook);

// GET /books/:bookId
router.get("/:bookId", getBookById);

// PUT /books/:bookId
router.put("/:bookId", updateBook);

// DELETE /books/:bookId
router.delete("/:bookId", deleteBook);

module.exports = router;
```

#### 4.3 Update app.js to use the router
```javascript
const express = require("express");
const app = express();

const bookRouter = require("./routes/bookRouter");

// Middleware to parse JSON
app.use(express.json());

// Mount the book router at /books path
app.use("/books", bookRouter);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### Explanation
By extracting routes into a separate `bookRouter.js`, we follow the **Router** pattern. This separates route definitions from the main app file, making it easy to add more routers for other resources (like dogs, users, etc.) in the future. The `router.use("/books", bookRouter)` mounts all book routes under the `/books` path prefix.

### Testing with Postman
Test all endpoints again to ensure they still work:
- **GET** `http://localhost:4000/books`
- **POST** `http://localhost:4000/books`
- **GET** `http://localhost:4000/books/1`
- **PUT** `http://localhost:4000/books/1`
- **DELETE** `http://localhost:4000/books/1`

All endpoints should respond exactly as before!

---

## Step 5: Move bookModel.js to models/ folder

### Instructions

#### 5.1 Create the models directory
1. Create a new folder: `api-books/models/`
2. Move `api-books/bookModel.js` to `api-books/models/bookModel.js`

#### 5.2 Update imports in bookControllers.js
```javascript
// OLD
const Book = require("./bookModel");

// NEW
const Book = require("../models/bookModel");
```

### Explanation
Organizing files into folders by layer (models, controllers, routes, views) is a best practice. This structure makes it clear where each type of code belongs and makes large projects easier to navigate. As you add more models (dogModel, userModel, etc.), they'll all live in the `models/` folder.

### Testing with Postman
Test all endpoints again:
- **GET** `http://localhost:4000/books`
- **POST** `http://localhost:4000/books`
- **GET** `http://localhost:4000/books/1`
- **PUT** `http://localhost:4000/books/1`
- **DELETE** `http://localhost:4000/books/1`

Everything should work as before!

---

## Step 6: Move bookControllers.js to controllers/ folder

### Instructions

#### 6.1 Create the controllers directory
1. Create a new folder: `api-books/controllers/`
2. Move `api-books/bookControllers.js` to `api-books/controllers/bookControllers.js`

#### 6.2 Update imports in routes/bookRouter.js
```javascript
// OLD
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../bookControllers");

// NEW
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookControllers");
```

### Explanation
With controllers in their own folder, your project structure now clearly reflects the MVC pattern. This separation of concerns makes your code:
- **More scalable**: Easy to add more controllers without cluttering the root directory
- **More maintainable**: Clear structure helps new developers understand the architecture
- **More testable**: Each layer can be tested independently

Your final project structure should look like:
```
api-books/
├── app.js
├── package.json
├── models/
│   └── bookModel.js
├── controllers/
│   └── bookControllers.js
├── routes/
│   └── bookRouter.js
```

### Testing with Postman
Test all endpoints one final time:
- **GET** `http://localhost:4000/books` - Get all books
- **POST** `http://localhost:4000/books` - Create with `{"title": "To Kill a Mockingbird", "author": "Harper Lee", "pages": 281}`
- **GET** `http://localhost:4000/books/1` - Get book by ID
- **PUT** `http://localhost:4000/books/1` - Update with `{"pages": 290}`
- **DELETE** `http://localhost:4000/books/1` - Delete a book

---

## Step 7: Push Changes to GitHub

### Instructions

1. **Stage all changes**:
   ```
   git add .
   ```

2. **Commit with a descriptive message**:
   ```
   git commit -m "Refactor api-books to MVC pattern with routing

   - Rename bookLib.js to bookModel.js
   - Rename bookHandlers.js to bookControllers.js
   - Extract routes to routes/bookRouter.js
   - Organize files into models/, controllers/, routes/ folders
   - Update all import paths accordingly
   - All endpoints tested and working"
   ```

3. **Push to GitHub**:
   ```
   git push origin main
   ```

4. **Verify on GitHub**: Visit your repository on GitHub and confirm all changes are reflected.

### Explanation
Pushing your refactored code to GitHub ensures:
- Your work is backed up in the cloud
- Other collaborators can access the improved codebase
- You have a commit history showing the evolution of your project
- Good commit messages help future developers understand what changed and why

---

## Summary of Changes

| Before | After | Purpose |
|--------|-------|---------|
| `bookLib.js` | `models/bookModel.js` | Clarifies this is the data model layer |
| `bookHandlers.js` | `controllers/bookControllers.js` | Clarifies this is the controller layer |
| Routes in `app.js` | `routes/bookRouter.js` | Separates routing logic for scalability |
| All files in root | Organized in folders | Implements MVC architecture |

---

## Key Concepts Learned

✅ **MVC Pattern**: Separation of concerns makes code more maintainable
✅ **Models**: Handle data and business logic
✅ **Controllers**: Process HTTP requests and coordinate with models
✅ **Routes**: Define API endpoints and map them to controllers
✅ **Folder Organization**: Makes large projects easier to navigate
✅ **Scalability**: Easy to add more resources (dogs, users, etc.)

