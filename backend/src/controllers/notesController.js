const Note = require('../models/Note');
const { validateNote } = require('../utils/validators');

// Create a new note
exports.createNote = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.userId;

    // Validate input
    const validation = validateNote({ title, content, tags });
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const note = new Note({
      title,
      content,
      tags: tags || [],
      userId,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all notes with optional search and filter
exports.getNotes = async (req, res) => {
  try {
    const { q, tags, sortBy = '-createdAt' } = req.query;
    const userId = req.userId;
    let query = { userId };

    // For search, use regex pattern matching instead of text search
    if (q) {
      const searchRegex = new RegExp(q, 'i');
      query.$or = [
        { title: searchRegex },
        { content: searchRegex }
      ];
    }

    if (tags) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      query.tags = { $in: tagArray };
    }

    const notes = await Note.find(query).sort(sortBy);
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single note by ID
exports.getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a note
exports.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tags, isFavorite } = req.body;
    const userId = req.userId;

    // Validate input
    const validation = validateNote({ title, content, tags });
    if (!validation.isValid) {
      return res.status(400).json({ errors: validation.errors });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, tags: tags || [], isFavorite },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a note
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Check if note belongs to user
    if (note.userId.toString() !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    await Note.findByIdAndDelete(id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
