# Backend - Notes and Bookmark Manager API

REST API built with Node.js, Express, and MongoDB for managing personal notes and bookmarks.

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations for Notes and Bookmarks
- ✅ Search functionality using text search
- ✅ Filter by tags
- ✅ Mark items as favorites
- ✅ URL validation for bookmarks
- ✅ Auto-fetch bookmark titles from URLs
- ✅ Comprehensive error handling
- ✅ MongoDB integration with Mongoose

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-bookmark-db
NODE_ENV=development
```

## Running the Application

### Development (with auto-reload):
```bash
npm run dev
```

### Production:
```bash
npm start
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health` - Check if server is running

### Notes API

#### Create Note
- **POST** `/api/notes`
- **Body:**
```json
{
  "title": "My Note",
  "content": "Note content here",
  "tags": ["tag1", "tag2"]
}
```

#### Get All Notes
- **GET** `/api/notes`
- **Query Parameters:**
  - `q=searchTerm` - Search in title and content
  - `tags=tag1,tag2` - Filter by tags
  - `sortBy=-createdAt` - Sort by field (prefix with `-` for descending)

#### Get Single Note
- **GET** `/api/notes/:id`

#### Update Note
- **PUT** `/api/notes/:id`
- **Body:** Same as Create (all fields optional except at least one must be provided)

#### Delete Note
- **DELETE** `/api/notes/:id`

### Bookmarks API

#### Create Bookmark
- **POST** `/api/bookmarks`
- **Body:**
```json
{
  "title": "Example Site",
  "url": "https://example.com",
  "description": "A useful bookmark",
  "tags": ["tag1", "tag2"]
}
```
*Note: If title is not provided, it will be auto-fetched from the URL*

#### Get All Bookmarks
- **GET** `/api/bookmarks`
- **Query Parameters:** Same as Notes API

#### Get Single Bookmark
- **GET** `/api/bookmarks/:id`

#### Update Bookmark
- **PUT** `/api/bookmarks/:id`
- **Body:** Same as Create

#### Delete Bookmark
- **DELETE** `/api/bookmarks/:id`

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message"
}
```

or with validation errors:
```json
{
  "errors": {
    "field": "Error message"
  }
}
```

## HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   │   ├── notesController.js
│   │   └── bookmarksController.js
│   ├── models/
│   │   ├── Note.js
│   │   └── Bookmark.js
│   ├── routes/
│   │   ├── notes.js
│   │   └── bookmarks.js
│   ├── utils/
│   │   ├── validators.js
│   │   └── metadata.js
│   └── index.js
├── package.json
├── .env.example
└── README.md
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Validator.js** - URL and data validation
- **Axios** - HTTP client for fetching metadata
- **Cheerio** - HTML parser for metadata extraction
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables management

## Database Models

### Note Schema
```javascript
{
  title: String (required, max 200 chars),
  content: String (required),
  tags: [String],
  isFavorite: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookmark Schema
```javascript
{
  title: String (max 200 chars),
  url: String (required, must be valid URL),
  description: String (max 500 chars),
  tags: [String],
  isFavorite: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## Sample cURL Requests

### Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Shopping List",
    "content": "Buy milk, eggs, bread",
    "tags": ["shopping", "todo"]
  }'
```

### Get All Notes
```bash
curl http://localhost:5000/api/notes
```

### Search Notes
```bash
curl "http://localhost:5000/api/notes?q=shopping"
```

### Filter by Tags
```bash
curl "http://localhost:5000/api/notes?tags=shopping,todo"
```

### Create a Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://github.com",
    "description": "GitHub homepage",
    "tags": ["development", "github"]
  }'
```

### Update a Note
```bash
curl -X PUT http://localhost:5000/api/notes/[NOTE_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "isFavorite": true
  }'
```

### Delete a Note
```bash
curl -X DELETE http://localhost:5000/api/notes/[NOTE_ID]
```

## Future Enhancements

- User authentication with JWT
- User-specific data isolation
- Rate limiting
- Input sanitization
- Request logging
- API documentation with Swagger/OpenAPI
- Database backup automation
- Caching with Redis

## License

ISC
