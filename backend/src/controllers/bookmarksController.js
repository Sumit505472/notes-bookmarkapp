const Bookmark = require('../models/Bookmark');
const { validateBookmark } = require('../utils/validators');
const { fetchMetadata } = require('../utils/metadata');

// Create a new bookmark
exports.createBookmark = async (req, res) => {
  try {
    let { title, url, description, tags } = req.body;
    const userId = req.userId;

    // Validate input
    const validation = validateBookmark({ title, url, description, tags });
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    // Auto-fetch title if not provided
    if (!title || !title.trim()) {
      title = await fetchMetadata(url);
      if (!title) {
        title = url; // Fallback to URL if fetch fails
      }
    }

    const bookmark = new Bookmark({
      title,
      url,
      description,
      tags: tags || [],
      userId,
    });

    await bookmark.save();
    res.status(201).json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all bookmarks with optional search and filter
exports.getBookmarks = async (req, res) => {
  try {
    const { q, tags, sortBy = '-createdAt' } = req.query;
    const userId = req.userId;
    let query = { userId };

    // For search, use regex pattern matching instead of text search
    if (q) {
      const searchRegex = new RegExp(q, 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex }
      ];
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const bookmarks = await Bookmark.find(query).sort(sortBy);
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single bookmark by ID
exports.getBookmarkById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const bookmark = await Bookmark.findById(id);
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    // Check if bookmark belongs to user
    if (bookmark.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json(bookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a bookmark
exports.updateBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, url, description, tags, isFavorite } = req.body;
    const userId = req.userId;

    // Validate input
    const validation = validateBookmark({ title, url, description, tags });
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const bookmark = await Bookmark.findById(id);
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    // Check if bookmark belongs to user
    if (bookmark.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Auto-fetch title if not provided
    if (!title || !title.trim()) {
      title = await fetchMetadata(url);
      if (!title) {
        title = url; // Fallback to URL if fetch fails
      }
    }

    const updatedBookmark = await Bookmark.findByIdAndUpdate(
      id,
      { title, url, description, tags: tags || [], isFavorite },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedBookmark);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a bookmark
exports.deleteBookmark = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const bookmark = await Bookmark.findById(id);
    if (!bookmark) {
      return res.status(404).json({ error: 'Bookmark not found' });
    }

    // Check if bookmark belongs to user
    if (bookmark.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Bookmark.findByIdAndDelete(id);
    res.status(200).json({ message: 'Bookmark deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
