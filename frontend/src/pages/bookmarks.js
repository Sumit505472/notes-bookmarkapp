import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import BookmarkCard from '@/components/BookmarkCard';
import BookmarkModal from '@/components/BookmarkModal';
import { useAuth } from '@/context/AuthContext';
import { fetchBookmarks, createBookmark, updateBookmark, deleteBookmark } from '@/lib/api';

export default function Bookmarks() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBookmark, setEditingBookmark] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadBookmarks();
    }
  }, [isAuthenticated]);

  const loadBookmarks = async (query = '', tags = '') => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchBookmarks(query, tags);
      setBookmarks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadBookmarks(searchQuery, selectedTags);
  };

  const handleFilterTags = (tags) => {
    setSelectedTags(tags);
    loadBookmarks(searchQuery, tags);
  };

  const handleCreateNew = () => {
    setEditingBookmark(null);
    setShowModal(true);
  };

  const handleEditBookmark = (bookmark) => {
    setEditingBookmark(bookmark);
    setShowModal(true);
  };

  const handleSaveBookmark = async (bookmarkData) => {
    try {
      if (editingBookmark) {
        await updateBookmark(editingBookmark._id, bookmarkData);
      } else {
        await createBookmark(bookmarkData);
      }
      setShowModal(false);
      loadBookmarks(searchQuery, selectedTags);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteBookmark = async (id) => {
    if (confirm('Are you sure you want to delete this bookmark?')) {
      try {
        await deleteBookmark(id);
        loadBookmarks(searchQuery, selectedTags);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const bookmark = bookmarks.find(b => b._id === id);
      await updateBookmark(id, { ...bookmark, isFavorite });
      loadBookmarks(searchQuery, selectedTags);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Bookmarks - NoteBookmark Manager</title>
      </Head>

      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">🔖 My Bookmarks</h1>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              + New Bookmark
            </button>
          </div>

          <div className="space-y-4 bg-white rounded-lg shadow-md p-6">
            <SearchBar
              query={searchQuery}
              setQuery={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search bookmarks by title, description, or URL..."
            />
            <TagFilter tags={[]} onFilter={handleFilterTags} />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">⏳</div>
            <p className="text-gray-600 mt-4">Loading bookmarks...</p>
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">No bookmarks found. Create your first bookmark!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map(bookmark => (
              <BookmarkCard
                key={bookmark._id}
                bookmark={bookmark}
                onEdit={handleEditBookmark}
                onDelete={handleDeleteBookmark}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <BookmarkModal
          bookmark={editingBookmark}
          onClose={() => setShowModal(false)}
          onSave={handleSaveBookmark}
        />
      )}
    </>
  );
}
