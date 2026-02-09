# Personal Notes and Bookmark Manager

A full-stack web application for managing personal notes and bookmarks with search, tagging, and favorites functionality.

## 🎯 Overview

This project provides a complete solution for organizing personal notes and saving bookmarks. Users can:
- Create, read, update, and delete notes and bookmarks
- Search across all items with full-text search
- Organize items with tags
- Mark items as favorites
- Auto-fetch bookmark titles from URLs
- Enjoy a responsive, modern UI

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                      │
│              Port: 3000                                     │
│     • React Components with Tailwind CSS                    │
│     • Search & Filter UI                                   │
│     • Modal Forms for CRUD operations                       │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST API
                           │ (Axios)
┌──────────────────────────▼──────────────────────────────────┐
│                    Backend (Express.js)                     │
│              Port: 5000                                     │
│     • RESTful API endpoints                                 │
│     • MongoDB integration with Mongoose                     │
│     • Input validation & error handling                     │
│     • Auto-metadata fetching for bookmarks                  │
└──────────────────────────┬──────────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                  MongoDB Database                           │
│     • Notes Collection                                      │
│     • Bookmarks Collection                                  │
└─────────────────────────────────────────────────────────────┘
```

## 📋 Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- Axios (for metadata fetching)
- Cheerio (HTML parsing)
- Validator.js (input validation)

**Frontend:**
- Next.js 14
- React 18
- Tailwind CSS
- JavaScript (ES6+)

## 🚀 Quick Start

### Prerequisites

- Node.js 14+
- npm or yarn
- MongoDB (local or cloud)
- Git

### Installation & Setup

#### 1. Clone the Project

```bash
# Navigate to your workspace
cd "path/to/notesandbookmark app"
```

#### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env and set your MongoDB URI if different from default

# Start the server
npm run dev
# Backend will run on http://localhost:5000
```

**Backend Environment Variables:**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notes-bookmark-db
NODE_ENV=development
```

#### 3. Setup Frontend

```bash
# In a new terminal
cd frontend

# Install dependencies
npm install

# Create .env.local (optional, uses localhost by default)
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start the development server
npm run dev
# Frontend will run on http://localhost:3000
```

#### 4. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```
GET /health
```

### Notes API

#### Create Note
```bash
POST /api/notes
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the note content",
  "tags": ["important", "work"]
}
```

#### Get All Notes
```bash
GET /api/notes

# With search
GET /api/notes?q=search+term

# With tag filter
GET /api/notes?tags=work,important

# Combined
GET /api/notes?q=search+term&tags=work
```

#### Get Single Note
```bash
GET /api/notes/:id
```

#### Update Note
```bash
PUT /api/notes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content",
  "tags": ["work"],
  "isFavorite": true
}
```

#### Delete Note
```bash
DELETE /api/notes/:id
```

### Bookmarks API

#### Create Bookmark
```bash
POST /api/bookmarks
Content-Type: application/json

{
  "url": "https://github.com",
  "title": "GitHub",  # Optional - auto-fetched if empty
  "description": "Version control platform",
  "tags": ["development"]
}
```

#### Get All Bookmarks
```bash
GET /api/bookmarks

# With search
GET /api/bookmarks?q=github

# With filter
GET /api/bookmarks?tags=development

# Combined
GET /api/bookmarks?q=github&tags=development
```

#### Get Single Bookmark
```bash
GET /api/bookmarks/:id
```

#### Update Bookmark
```bash
PUT /api/bookmarks/:id
Content-Type: application/json

{
  "url": "https://github.com",
  "title": "GitHub - Updated",
  "description": "Updated description",
  "tags": ["dev"],
  "isFavorite": true
}
```

#### Delete Bookmark
```bash
DELETE /api/bookmarks/:id
```

## 📊 Database Schema

### Notes Collection
```javascript
{
  _id: ObjectId,
  title: String (required, max 200),
  content: String (required),
  tags: [String],
  isFavorite: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookmarks Collection
```javascript
{
  _id: ObjectId,
  title: String (max 200),
  url: String (required, valid URL),
  description: String (max 500),
  tags: [String],
  isFavorite: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Sample cURL Requests

### Create a Note
```bash
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Shopping List",
    "content": "- Milk\n- Eggs\n- Bread",
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

### Create a Bookmark
```bash
curl -X POST http://localhost:5000/api/bookmarks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://github.com",
    "description": "GitHub - where the world builds software",
    "tags": ["development"]
  }'
```

### Update a Bookmark
```bash
curl -X PUT http://localhost:5000/api/bookmarks/[BOOKMARK_ID] \
  -H "Content-Type: application/json" \
  -d '{
    "title": "GitHub Official Site",
    "isFavorite": true
  }'
```

### Delete an Item
```bash
curl -X DELETE http://localhost:5000/api/notes/[NOTE_ID]
```

## 📁 Project Structure

```
notesandbookmark app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── notesController.js
│   │   │   └── bookmarksController.js
│   │   ├── models/
│   │   │   ├── Note.js
│   │   │   └── Bookmark.js
│   │   ├── routes/
│   │   │   ├── notes.js
│   │   │   └── bookmarks.js
│   │   ├── utils/
│   │   │   ├── validators.js
│   │   │   └── metadata.js
│   │   └── index.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── _app.js
│   │   │   ├── index.js
│   │   │   ├── notes.js
│   │   │   └── bookmarks.js
│   │   ├── components/
│   │   │   ├── Navigation.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── TagFilter.jsx
│   │   │   ├── NoteCard.jsx
│   │   │   ├── BookmarkCard.jsx
│   │   │   ├── NoteModal.jsx
│   │   │   └── BookmarkModal.jsx
│   │   ├── lib/
│   │   │   └── api.js
│   │   └── styles/
│   │       └── globals.css
│   ├── public/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── README.md
│
└── README.md (this file)
```

## 🎨 Features Detailed

### Search & Filter
- **Full-text search**: Search notes by title and content; bookmarks by title, description, and URL
- **Tag filtering**: Filter items by multiple tags
- **Combined search**: Search and filter simultaneously

### Favorites
- Mark any note or bookmark as favorite with a star icon
- Favorite status is persisted in the database

### Auto-fetch Titles
- When creating a bookmark without a title, the system automatically fetches the page title from the URL
- Fallback to URL if fetching fails

### Validation
- Required fields validation
- URL format validation for bookmarks
- Character limit validation for titles and descriptions
- Tag validation (must be non-empty strings)

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Works on all screen sizes
- Touch-friendly interface

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev      # Start with hot-reload
npm start        # Production start
```

### Frontend Development
```bash
cd frontend
npm run dev      # Start dev server with hot-reload
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📝 Error Handling

All API responses follow a consistent format:

**Success Response:**
```json
{
  "_id": "...",
  "title": "...",
  "content": "...",
  "tags": [],
  "isFavorite": false,
  "createdAt": "2024-01-01T00:00:00Z",
  "updatedAt": "2024-01-01T00:00:00Z"
}
```

**Error Response:**
```json
{
  "error": "Detailed error message"
}
```

**Validation Error Response:**
```json
{
  "errors": {
    "field_name": "Error message for this field"
  }
}
```

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Validation error |
| 404 | Not Found - Resource doesn't exist |
| 500 | Internal Server Error - Server issue |

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017

Solution:
1. Ensure MongoDB is installed and running
2. Check MONGODB_URI in .env
3. Verify connection string format
```

### CORS Errors in Frontend
```
Error: Access to XMLHttpRequest has been blocked by CORS

Solution:
1. Verify backend is running on port 5000
2. Check NEXT_PUBLIC_API_URL in frontend/.env.local
3. Backend CORS is enabled by default
```

### API Not Responding
```
Solution:
1. Check if backend is running: curl http://localhost:5000/health
2. Check backend console for errors
3. Verify PORT setting in .env
```

### Frontend Not Loading
```
Solution:
1. Check if frontend is running on port 3000
2. Clear .next folder: rm -rf .next
3. Reinstall dependencies: rm -rf node_modules && npm install
4. Restart dev server
```

## 🚀 Deployment

### Deploy Backend (Node.js)
- Options: Heroku, Railway, Render, AWS EC2
- Set environment variables on hosting platform
- Ensure MongoDB is accessible from server

### Deploy Frontend (Next.js)
- Options: Vercel (easiest), Netlify, AWS Amplify
- Set `NEXT_PUBLIC_API_URL` to production backend URL
- Build and deploy

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Mongoose Documentation](https://mongoosejs.com/)

## ✨ Features Implemented

- ✅ Full CRUD operations for notes and bookmarks
- ✅ Search and filter functionality
- ✅ Tag-based organization
- ✅ Favorites system
- ✅ Auto-fetch bookmark titles
- ✅ Input validation and error handling
- ✅ Responsive UI with Tailwind CSS
- ✅ RESTful API design
- ✅ MongoDB database integration
- ✅ Modal-based create/edit forms

## 🎁 Bonus Features Included

- ✅ Auto-fetch metadata (page titles) from bookmark URLs
- ✅ Favorites marking system
- ✅ Multiple tag filtering
- ✅ Comprehensive API documentation
- ✅ Sample cURL requests

## 📞 Support

For issues or questions:
1. Check troubleshooting section above
2. Review API documentation
3. Check browser console for frontend errors
4. Check terminal for backend errors

## 📄 License

ISC

---

**Last Updated:** February 2026

**Version:** 1.0.0

**Status:** Production Ready ✅
