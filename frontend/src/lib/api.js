const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get authorization headers
const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Notes API
export const fetchNotes = async (query = '', tags = '') => {
  let url = `${API_BASE_URL}/notes`;
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (tags) params.append('tags', tags);
  if (params.toString()) url += '?' + params.toString();

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch notes');
  return response.json();
};

export const fetchNoteById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch note');
  return response.json();
};

export const createNote = async (data) => {
  const response = await fetch(`${API_BASE_URL}/notes`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create note');
  return response.json();
};

export const updateNote = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update note');
  return response.json();
};

export const deleteNote = async (id) => {
  const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete note');
  return response.json();
};

// Bookmarks API
export const fetchBookmarks = async (query = '', tags = '') => {
  let url = `${API_BASE_URL}/bookmarks`;
  const params = new URLSearchParams();
  if (query) params.append('q', query);
  if (tags) params.append('tags', tags);
  if (params.toString()) url += '?' + params.toString();

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch bookmarks');
  return response.json();
};

export const fetchBookmarkById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to fetch bookmark');
  return response.json();
};

export const createBookmark = async (data) => {
  const response = await fetch(`${API_BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create bookmark');
  return response.json();
};

export const updateBookmark = async (id, data) => {
  const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update bookmark');
  return response.json();
};

export const deleteBookmark = async (id) => {
  const response = await fetch(`${API_BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error('Failed to delete bookmark');
  return response.json();
};
