import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navigation from '@/components/Navigation';
import SearchBar from '@/components/SearchBar';
import TagFilter from '@/components/TagFilter';
import NoteCard from '@/components/NoteCard';
import NoteModal from '@/components/NoteModal';
import { useAuth } from '@/context/AuthContext';
import { fetchNotes, createNote, updateNote, deleteNote } from '@/lib/api';

export default function Notes() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    if (isAuthenticated) {
      loadNotes();
    }
  }, [isAuthenticated]);

  const loadNotes = async (query = '', tags = '') => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchNotes(query, tags);
      setNotes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadNotes(searchQuery, selectedTags);
  };

  const handleFilterTags = (tags) => {
    setSelectedTags(tags);
    loadNotes(searchQuery, tags);
  };

  const handleCreateNew = () => {
    setEditingNote(null);
    setShowModal(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await updateNote(editingNote._id, noteData);
      } else {
        await createNote(noteData);
      }
      setShowModal(false);
      loadNotes(searchQuery, selectedTags);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteNote = async (id) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        loadNotes(searchQuery, selectedTags);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    try {
      const note = notes.find(n => n._id === id);
      await updateNote(id, { ...note, isFavorite });
      loadNotes(searchQuery, selectedTags);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Notes - NoteBookmark Manager</title>
      </Head>

      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">📝 My Notes</h1>
            <button
              onClick={handleCreateNew}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              + New Note
            </button>
          </div>

          <div className="space-y-4 bg-white rounded-lg shadow-md p-6">
            <SearchBar
              query={searchQuery}
              setQuery={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search notes by title or content..."
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
            <p className="text-gray-600 mt-4">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 text-lg">No notes found. Create your first note!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <NoteModal
          note={editingNote}
          onClose={() => setShowModal(false)}
          onSave={handleSaveNote}
        />
      )}
    </>
  );
}
