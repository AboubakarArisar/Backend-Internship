# Bookstore API

A RESTful API for managing books in a bookstore built with Node.js, Express.js, and MongoDB.

## Quick Start

```bash
# 1. Clone and setup
git clone https://github.com/AboubakarArisar/Backend-Internship
cd D-Hub-Corp-Internship

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp env.example .env
# Edit .env with your MongoDB connection string

# 4. Start the server
npm run dev
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **express-validator** - Input validation
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **nodemon** - Development server

## Project Structure

```
bookstore-api/
├── app.js                 # Main application file
├── index.js              # Entry point
├── package.json          # Dependencies and scripts
├── config/
│   ├── database.js       # Database connection
│   └── env.js           # Environment configuration
├── models/
│   ├── Book.js          # Book model schema
│   └── User.js          # User model schema
├── controllers/
│   ├── bookController.js # Book business logic
│   └── userController.js # User business logic
├── services/
│   ├── bookService.js   # Book database operations
│   └── userService.js   # User database operations
├── routes/
│   ├── bookRoutes.js    # Book API routes
│   └── userRoutes.js    # User API routes
└── middlewares/
    ├── errorHandler.js  # Error handling middleware
    └── validation.js    # Input validation middleware
```

## Installation & Setup

1. Clone the repository

```bash
git clone https://github.com/AboubakarArisar/Backend-Internship
cd D-Hub-Corp-Internship
```

2. Install dependencies

```bash
npm install

# Or run the bonus dependencies installer:
# chmod +x install-bonus-deps.sh
# ./install-bonus-deps.sh
```

3. Set up environment variables
   Copy the example environment file and configure it:

```bash
cp env.example .env
```

Then edit the `.env` file with your specific configuration:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/bookstore
NODE_ENV=development

# For MongoDB Atlas (cloud), replace MONGODB_URI with:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bookstore

# For JWT authentication (future feature):
# JWT_SECRET=your_super_secret_jwt_key_here
# JWT_EXPIRE=7d
```

4. Start MongoDB service

```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI with your Atlas connection string
```

5. Run the application

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

Base URL: `http://localhost:3000`

### Books

| Method | Endpoint         | Description         |
| ------ | ---------------- | ------------------- |
| GET    | `/`              | API welcome message |
| POST   | `/api/books`     | Create a new book   |
| GET    | `/api/books`     | Get all books       |
| GET    | `/api/books/:id` | Get a book by ID    |
| PUT    | `/api/books/:id` | Update a book       |
| DELETE | `/api/books/:id` | Delete a book       |

### Users

| Method | Endpoint                   | Description                     |
| ------ | -------------------------- | ------------------------------- |
| POST   | `/api/users`               | Create a new user               |
| GET    | `/api/users`               | Get all users (with pagination) |
| GET    | `/api/users/:id`           | Get a user by ID                |
| PUT    | `/api/users/:id`           | Update a user                   |
| DELETE | `/api/users/:id`           | Delete a user                   |
| POST   | `/api/users/:id/favorites` | Add book to favorites           |
| DELETE | `/api/users/:id/favorites` | Remove book from favorites      |
| GET    | `/api/users/:id/favorites` | Get user's favorite books       |
| GET    | `/api/users/:id/books`     | Get user's owned books          |

### Query Parameters for Books

- `page` (number) - Page number for pagination (default: 1)
- `limit` (number) - Items per page (default: 10, max: 100)
- `search` (string) - Search in title, author, or category
- `category` (string) - Filter by book category
- `minPrice` (number) - Filter by minimum price
- `maxPrice` (number) - Filter by maximum price
- `inStock` (boolean) - Filter by availability

Example: `/api/books?page=2&limit=5&search=habits&minPrice=10&maxPrice=30`

## Request/Response Examples

### Create a Book

**POST** `/api/books`

Request body:

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 20,
  "isbn": "1234567890",
  "publishedDate": "2018-10-16",
  "category": "Self-Help",
  "description": "A comprehensive guide to building good habits and breaking bad ones.",
  "inStock": true
}
```

Response:

```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 20,
    "isbn": "1234567890",
    "publishedDate": "2018-10-16T00:00:00.000Z",
    "createdAt": "2023-09-04T10:30:00.000Z",
    "updatedAt": "2023-09-04T10:30:00.000Z"
  }
}
```

### Get All Books

**GET** `/api/books`

Response:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "title": "Atomic Habits",
      "author": "James Clear",
      "price": 20,
      "isbn": "1234567890",
      "publishedDate": "2018-10-16T00:00:00.000Z"
    }
  ]
}
```

### Get Book by ID

**GET** `/api/books/:id`

Response:

```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "title": "Atomic Habits",
    "author": "James Clear",
    "price": 20,
    "isbn": "1234567890",
    "publishedDate": "2018-10-16T00:00:00.000Z"
  }
}
```

### Update a Book

**PUT** `/api/books/:id`

Request body:

```json
{
  "title": "Atomic Habits - Updated Edition",
  "price": 25
}
```

Response:

```json
{
  "success": true,
  "data": {
    "_id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "title": "Atomic Habits - Updated Edition",
    "author": "James Clear",
    "price": 25,
    "isbn": "1234567890",
    "publishedDate": "2018-10-16T00:00:00.000Z"
  }
}
```

### Delete a Book

**DELETE** `/api/books/:id`

Response:

```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

## Schemas

### Book Schema

Each book contains the following fields:

- `title` (String, required) - Book title
- `author` (String, required) - Author name
- `price` (Number, required) - Book price (minimum: 0)
- `isbn` (String, required, unique) - ISBN number
- `publishedDate` (Date, required) - Publication date
- `owner` (ObjectId, ref: User) - Book owner
- `category` (String, optional) - Book category
- `description` (String, optional) - Book description
- `inStock` (Boolean, default: true) - Availability status
- `createdAt` (Date, auto-generated) - Record creation timestamp
- `updatedAt` (Date, auto-generated) - Record update timestamp

### User Schema

Each user contains the following fields:

- `name` (String, required) - User's full name
- `email` (String, required, unique) - User's email address
- `password` (String, required) - Hashed password
- `role` (String, enum: ['user', 'admin'], default: 'user') - User role
- `favoriteBooks` (Array of ObjectIds, ref: Book) - User's favorite books
- `ownedBooks` (Array of ObjectIds, ref: Book) - Books owned by user
- `createdAt` (Date, auto-generated) - Record creation timestamp
- `updatedAt` (Date, auto-generated) - Record update timestamp

## User Examples

### Create a User

**POST** `/api/users`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

### Add Book to Favorites

**POST** `/api/users/:id/favorites`

Request body:

```json
{
  "bookId": "64f5a1b2c3d4e5f6a7b8c9d0"
}
```

## Error Handling

The API includes comprehensive error handling:

- **400 Bad Request** - Invalid input data
- **404 Not Found** - Resource not found
- **500 Internal Server Error** - Server errors

Error response format:

```json
{
  "success": false,
  "message": "Error description"
}
```

## Testing with Postman

1. Import the API endpoints into Postman
2. Set the base URL to `http://localhost:3000`
3. Test each endpoint with the provided examples
4. Ensure MongoDB is running before testing

## Development Scripts

```bash
npm run dev    # Start development server with nodemon
npm start      # Start production server
```

## Features

### Core Features

- ✅ Full CRUD operations for books and users
- ✅ MongoDB integration with Mongoose
- ✅ Clean architecture with separation of concerns
- ✅ RESTful API design
- ✅ Environment configuration
- ✅ CORS enabled

### Bonus Features

- ✅ **Input Validation** - Express-validator for comprehensive input validation
- ✅ **Pagination & Search** - Advanced filtering and search capabilities
  - Pagination with customizable page size
  - Full-text search across title, author, and category
  - Price range filtering
  - Category filtering
  - Stock availability filtering
- ✅ **User Management** - Complete user system with associations
  - User registration and management
  - User-book associations (ownership and favorites)
  - User favorite books management
  - Population of related data

## License

ISC
