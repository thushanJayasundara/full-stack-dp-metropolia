# API Dogs - MVC & Routing Refactor Task

## Overview
In this task, you will refactor the `api-dogs` project to follow the **Model-View-Controller (MVC)** architectural pattern and implement a dedicated routing system. This will make your code more organized, scalable, and maintainable.

### What is MVC?
- **Model**: Handles data and business logic (dogModel.js)
- **View**: Returns data to the client (handled by Express responses)
- **Controller**: Processes requests and coordinates between Model and View (dogControllers.js)
- **Router**: Defines API endpoints and maps them to controllers (routes/dogRouter.js)

---

## Step 1: Rename dogLib.js to dogModel.js

### Instructions
1. Rename `api-dogs/dogLib.js` to `api-dogs/dogModel.js`
2. This file represents the **Model** layer - it handles all data operations

### Explanation
The Model layer should contain all business logic and data management. By renaming `dogLib` to `dogModel`, we're making it clear that this file is the data model for dogs. The model is independent of Express and can be reused anywhere in your application.

### Testing with Postman
You don't need to test this step yet - the rename doesn't affect the running API.

---

## Step 2: Update app.js to import from dogModel.js (temporary)

### Instructions
1. Open `api-dogs/dogHandlers.js`
2. Update the import statement:
```javascript
// OLD
const Dog = require("./dogLib");

// NEW
const Dog = require("./dogModel");
```

### Explanation
Since we renamed the file, we need to update the import path in the handlers. The handlers still reference the model, but now they're importing from the new filename.

### Testing with Postman
1. Make sure the server is still running (if not, run `node app.js`)
2. Test a GET request to `http://localhost:4000/dogs`
3. Verify you get the expected response

---

## Step 3: Rename dogHandlers.js to dogControllers.js

### Instructions
1. Rename `api-dogs/dogHandlers.js` to `api-dogs/dogControllers.js`

### Explanation
The Controller layer handles HTTP requests and responses. By renaming `dogHandlers` to `dogControllers`, we're following standard MVC naming conventions. Controllers receive requests from the router, interact with the model, and return responses to the client.

### Testing with Postman
1. Update `api-dogs/app.js` to import from the new file:
```javascript
// OLD
const {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} = require("./dogHandlers");

// NEW
const {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} = require("./dogControllers");
```

2. Test all endpoints with Postman:
   - **GET** `http://localhost:4000/dogs` - Should return all dogs
   - **POST** `http://localhost:4000/dogs` - Create a dog with JSON body: `{"name": "Rex", "weight": 25}`
   - **GET** `http://localhost:4000/dogs/1` - Get dog with ID 1
   - **PUT** `http://localhost:4000/dogs/1` - Update dog with JSON body: `{"name": "Rex Updated", "weight": 30}`
   - **DELETE** `http://localhost:4000/dogs/1` - Delete dog with ID 1

---

## Step 4: Extract Routes to routes/dogRouter.js

### Instructions

#### 4.1 Create the routes directory and file
1. Create a new folder: `api-dogs/routes/`
2. Create a new file: `api-dogs/routes/dogRouter.js`

#### 4.2 Add router logic to dogRouter.js
```javascript
const express = require("express");
const router = express.Router();

const {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} = require("../dogControllers");

// GET /dogs
router.get("/", getAllDogs);

// POST /dogs
router.post("/", createDog);

// GET /dogs/:dogId
router.get("/:dogId", getDogById);

// PUT /dogs/:dogId
router.put("/:dogId", updateDog);

// DELETE /dogs/:dogId
router.delete("/:dogId", deleteDog);

module.exports = router;
```

#### 4.3 Update app.js to use the router
```javascript
const express = require("express");
const app = express();

const dogRouter = require("./routes/dogRouter");

// Middleware to parse JSON
app.use(express.json());

// Mount the dog router at /dogs path
app.use("/dogs", dogRouter);

const port = 4000;
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### Explanation
By extracting routes into a separate `dogRouter.js`, we follow the **Router** pattern. This separates route definitions from the main app file, making it easy to add more routers for other resources (like books, users, etc.) in the future. The `router.use("/dogs", dogRouter)` mounts all dog routes under the `/dogs` path prefix.

### Testing with Postman
Test all endpoints again to ensure they still work:
- **GET** `http://localhost:4000/dogs`
- **POST** `http://localhost:4000/dogs`
- **GET** `http://localhost:4000/dogs/1`
- **PUT** `http://localhost:4000/dogs/1`
- **DELETE** `http://localhost:4000/dogs/1`

All endpoints should respond exactly as before!

---

## Step 5: Move dogModel.js to models/ folder

### Instructions

#### 5.1 Create the models directory
1. Create a new folder: `api-dogs/models/`
2. Move `api-dogs/dogModel.js` to `api-dogs/models/dogModel.js`

#### 5.2 Update imports in dogControllers.js
```javascript
// OLD
const Dog = require("./dogModel");

// NEW
const Dog = require("../models/dogModel");
```

### Explanation
Organizing files into folders by layer (models, controllers, routes, views) is a best practice. This structure makes it clear where each type of code belongs and makes large projects easier to navigate. As you add more models (bookModel, userModel, etc.), they'll all live in the `models/` folder.

### Testing with Postman
Test all endpoints again:
- **GET** `http://localhost:4000/dogs`
- **POST** `http://localhost:4000/dogs`
- **GET** `http://localhost:4000/dogs/1`
- **PUT** `http://localhost:4000/dogs/1`
- **DELETE** `http://localhost:4000/dogs/1`

Everything should work as before!

---

## Step 6: Move dogControllers.js to controllers/ folder

### Instructions

#### 6.1 Create the controllers directory
1. Create a new folder: `api-dogs/controllers/`
2. Move `api-dogs/dogControllers.js` to `api-dogs/controllers/dogControllers.js`

#### 6.2 Update imports in routes/dogRouter.js
```javascript
// OLD
const {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} = require("../dogControllers");

// NEW
const {
  getAllDogs,
  getDogById,
  createDog,
  updateDog,
  deleteDog,
} = require("../controllers/dogControllers");
```

### Explanation
With controllers in their own folder, your project structure now clearly reflects the MVC pattern. This separation of concerns makes your code:
- **More scalable**: Easy to add more controllers without cluttering the root directory
- **More maintainable**: Clear structure helps new developers understand the architecture
- **More testable**: Each layer can be tested independently

Your final project structure should look like:
```
api-dogs/
├── app.js
├── package.json
├── models/
│   └── dogModel.js
├── controllers/
│   └── dogControllers.js
├── routes/
│   └── dogRouter.js
```

### Testing with Postman
Test all endpoints one final time:
- **GET** `http://localhost:4000/dogs` - Get all dogs
- **POST** `http://localhost:4000/dogs` - Create with `{"name": "Buddy", "weight": 20}`
- **GET** `http://localhost:4000/dogs/1` - Get dog by ID
- **PUT** `http://localhost:4000/dogs/1` - Update with `{"weight": 25}`
- **DELETE** `http://localhost:4000/dogs/1` - Delete a dog

---

## Step 7: Push Changes to GitHub

### Instructions

1. **Stage all changes**:
   ```
   git add .
   ```

2. **Commit with a descriptive message**:
   ```
   git commit -m "Refactor api-dogs to MVC pattern with routing

   - Rename dogLib.js to dogModel.js
   - Rename dogHandlers.js to dogControllers.js
   - Extract routes to routes/dogRouter.js
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
| `dogLib.js` | `models/dogModel.js` | Clarifies this is the data model layer |
| `dogHandlers.js` | `controllers/dogControllers.js` | Clarifies this is the controller layer |
| Routes in `app.js` | `routes/dogRouter.js` | Separates routing logic for scalability |
| All files in root | Organized in folders | Implements MVC architecture |

---

## Key Concepts Learned

✅ **MVC Pattern**: Separation of concerns makes code more maintainable
✅ **Models**: Handle data and business logic
✅ **Controllers**: Process HTTP requests and coordinate with models
✅ **Routes**: Define API endpoints and map them to controllers
✅ **Folder Organization**: Makes large projects easier to navigate
✅ **Scalability**: Easy to add more resources (books, users, etc.)

