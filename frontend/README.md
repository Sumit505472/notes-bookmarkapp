# Frontend - Notes and Bookmark Manager

A responsive, modern Next.js application for managing personal notes and bookmarks with Tailwind CSS.

## Features

- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Create, edit, and delete notes and bookmarks
- ✅ Real-time search with text queries
- ✅ Tag-based filtering and organization
- ✅ Mark items as favorites with star ratings
- ✅ Auto-fetch bookmark titles from URLs
- ✅ Clean, intuitive user interface
- ✅ Modal dialogs for creating/editing items

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see backend README)

## Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file (optional, for custom API URL):
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Running the Application

### Development:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Production Build:
```bash
npm run build
npm start
```

### Linting:
```bash
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── _app.js                    # App wrapper
│   │   ├── index.js                   # Home page
│   │   ├── notes.js                   # Notes page
│   │   └── bookmarks.js               # Bookmarks page
│   ├── components/
│   │   ├── Navigation.jsx             # Top navigation bar
│   │   ├── SearchBar.jsx              # Search input component
│   │   ├── TagFilter.jsx              # Tag filtering component
│   │   ├── NoteCard.jsx               # Individual note card
│   │   ├── BookmarkCard.jsx           # Individual bookmark card
│   │   ├── NoteModal.jsx              # Create/edit note modal
│   │   └── BookmarkModal.jsx          # Create/edit bookmark modal
│   ├── lib/
│   │   └── api.js                     # API integration
│   └── styles/
│       └── globals.css                # Global styles
├── public/                            # Static files
├── next.config.js                     # Next.js config
├── tailwind.config.js                 # Tailwind CSS config
├── package.json
└── README.md
```

## Pages Overview

### Home Page (`/`)
- Welcome page with feature overview
- Quick navigation to Notes and Bookmarks
- App features listing

### Notes Page (`/notes`)
- View all notes with date stamps
- Create new notes with modal
- Search notes by title/content
- Filter by tags
- Edit existing notes
- Delete notes with confirmation
- Toggle favorite status

### Bookmarks Page (`/bookmarks`)
- View all saved bookmarks
- Create bookmarks with auto-title fetching
- Direct links to bookmarked URLs
- Search bookmarks
- Filter by tags
- Edit bookmarks
- Delete bookmarks
- Toggle favorite status

## Components

### Navigation
Top sticky navigation bar with links to Notes and Bookmarks pages.

### SearchBar
Input field with search button for querying notes/bookmarks.

### TagFilter
Tag management component for filtering items by multiple tags.

### NoteCard / BookmarkCard
Individual item cards displaying content with edit/delete actions and favorite toggle.

### NoteModal / BookmarkModal
Modal dialogs for creating and editing items with validation.

## API Integration

The application communicates with the backend API through the `api.js` module. Endpoints:

- `GET /api/notes` - Fetch all notes
- `POST /api/notes` - Create note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/:id` - Delete note
- `GET /api/bookmarks` - Fetch all bookmarks
- `POST /api/bookmarks` - Create bookmark
- `PUT /api/bookmarks/:id` - Update bookmark
- `DELETE /api/bookmarks/:id` - Delete bookmark

## Configuration

### Environment Variables

Create a `.env.local` file in the frontend directory:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

If not specified, defaults to `http://localhost:5000/api`

## Tailwind CSS

The project uses Tailwind CSS for styling. Key utility classes:
- `bg-blue-600` - Blue background
- `text-gray-900` - Text color
- `rounded-lg` - Rounded corners
- `shadow-md` - Shadow effects
- `hover:` - Hover states
- `responsive classes` - Mobile-first design

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Styling Features

- Responsive grid layouts
- Color-coded cards (blue for notes, purple for bookmarks)
- Smooth transitions and hover effects
- Accessible form inputs
- Loading states with spinner
- Error message displays
- Modal dialogs with backdrop

## Performance Optimizations

- Next.js image optimization
- Code splitting per route
- Automatic static optimization
- CSS optimization with Tailwind

## Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:5000`
- Check `NEXT_PUBLIC_API_URL` environment variable
- Verify CORS settings in backend

### Search/Filter Not Working
- Ensure backend database is running
- Check MongoDB connection in backend
- Verify API endpoints are responding

### Styling Issues
- Clear `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Restart dev server: `npm run dev`

## Technologies Used

- **Next.js** - React framework
- **React** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **JavaScript (ES6+)** - Programming language

## Future Enhancements

- User authentication UI
- Dark mode support
- Markdown support for notes
- Export/import functionality
- Note/bookmark sharing
- Offline support with Service Workers
- Mobile app with React Native
- Advanced search filters

## License

ISC
